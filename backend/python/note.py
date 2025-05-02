import whisper
import tiktoken
from openai import OpenAI
import time
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# --- CONFIGURATION ---
MODEL_NAME = "gemini-1.5-flash"
CHUNK_TOKEN_LIMIT = 8000

client = OpenAI(
    base_url=os.getenv("BASE_URL"),
    api_key="you_dont_need_a_key"
)

def process_audio(audio_file_path):

    print("Transcribing audio...")
    model = whisper.load_model("base")
    result = model.transcribe(audio_file_path)
    transcription_text = result["text"]
    print("Transcription completed.")

  
    print("Splitting into token-based chunks...")
    enc = tiktoken.encoding_for_model("gpt-4")
    def split_text_by_tokens(text, tokenizer, max_tokens=CHUNK_TOKEN_LIMIT):
        tokens = tokenizer.encode(text)
        chunks = []
        start = 0
        while start < len(tokens):
            end = start + max_tokens
            chunk_tokens = tokens[start:end]
            chunk_text = tokenizer.decode(chunk_tokens)
            chunks.append(chunk_text)
            start = end
        return chunks

    chunks = split_text_by_tokens(transcription_text, enc, CHUNK_TOKEN_LIMIT)
    print(f"Split into {len(chunks)} chunks.")

    print("Cleaning notes with model...")
    all_notes = []
    for i, chunk in enumerate(chunks):
        print(f"Processing chunk {i+1}/{len(chunks)}...")
        try:
            response = client.chat.completions.create(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": "You are an expert in perfect note taking. Clean the given video transcript into the best human-readable Markdown while preserving the original words. The result should be shorter than the original."},
                    {"role": "user", "content": chunk}
                ]
            )
            cleaned = response.choices[0].message.content
            all_notes.append(cleaned)
        except Exception as e:
            print(f"Error with chunk {i+1}: {e}")
            all_notes.append(f"<!-- Error with chunk {i+1}: {e} -->")
        time.sleep(1)  # prevent flooding if rate-limited

    final_output = "\n\n".join(all_notes)
    return final_output

if __name__ == "__main__":
    AUDIO_FILE = "videoplayback.mp3"
    OUTPUT_NOTES_FILE = "notes.md"

    print("Processing audio file...")
    final_notes = process_audio(AUDIO_FILE)

    with open(OUTPUT_NOTES_FILE, "w", encoding="utf-8") as f:
        f.write(final_notes)

    print(f"Done! Cleaned notes saved to {OUTPUT_NOTES_FILE}")
