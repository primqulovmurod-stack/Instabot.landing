-- Foydalanuvchilar jadvali
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instagram_page_id TEXT UNIQUE,
    instagram_access_token TEXT,
    full_name TEXT,
    email TEXT,
    activity_type TEXT DEFAULT 'stomatologiya',
    ai_prompt TEXT,
    ai_enabled BOOLEAN DEFAULT FALSE,
    is_paid BOOLEAN DEFAULT FALSE,
    trial_start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Xabarlar tarixi (Logs)
CREATE TABLE IF NOT EXISTS chat_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    sender_ig_id TEXT,
    sender_name TEXT,
    message_content TEXT,
    ai_response TEXT,
    status TEXT DEFAULT 'replied',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexlar (Tezkor qidiruv uchun)
CREATE INDEX IF NOT EXISTS idx_users_ig_page_id ON users(instagram_page_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_user_id ON chat_logs(user_id);
