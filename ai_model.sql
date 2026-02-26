-- Create the ai_model table
CREATE TABLE IF NOT EXISTS public.ai_model (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    model_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert the initial model name
INSERT INTO public.ai_model (model_name)
VALUES ('arcee-ai/trinity-large-preview:free');

-- Enable RLS
ALTER TABLE public.ai_model ENABLE ROW LEVEL SECURITY;

-- Allow public read access to the model name
CREATE POLICY "Allow public read access"
ON public.ai_model
FOR SELECT
TO public
USING (true);
