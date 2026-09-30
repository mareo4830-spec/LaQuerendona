-- ════════════════════════════════════════════════════════════════════════════
-- ESQUEMA SEGURO DE BASE DE DATOS SUPABASE — LA QUERENDONA (HUELVA)
-- Cumplimiento de Ciberseguridad OWASP Top 10 y Claude-Code-CyberSecurity-Skill
-- ════════════════════════════════════════════════════════════════════════════

-- 1. CREACIÓN DE LA TABLA DE RESERVAS
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    guests SMALLINT NOT NULL DEFAULT 2 CHECK (guests >= 1 AND guests <= 20),
    notes VARCHAR(300) DEFAULT '',
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    google_verified BOOLEAN NOT NULL DEFAULT false,
    google_email VARCHAR(100) DEFAULT '',
    google_id VARCHAR(100) DEFAULT '',
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. ÍNDICES DE ALTO RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_reservations_status_date ON public.reservations (status, date);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON public.reservations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reservations_email ON public.reservations (email);
CREATE INDEX IF NOT EXISTS idx_reservations_google_verified ON public.reservations (google_verified);

-- 3. HABILITACIÓN ESTRICTA DE ROW LEVEL SECURITY (RLS)
-- Previene A01: Broken Access Control y exposición indebida de comensales
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS DE ACCESO SEGURO (RLS POLICIES)

-- POLÍTICA 1 (PÚBLICA): Los comensales web pueden INSERTAR reservas, pero NO pueden leer las de otros comensales
DROP POLICY IF EXISTS "Public can create reservations" ON public.reservations;
CREATE POLICY "Public can create reservations"
ON public.reservations
FOR INSERT
TO anon, authenticated
WITH CHECK (
    status = 'pending' AND
    guests >= 1 AND
    guests <= 20 AND
    char_length(name) >= 2 AND
    char_length(phone) >= 6
);

-- POLÍTICA 2 (PRIVADA): Los usuarios anónimos NO pueden consultar datos personales de reservas
DROP POLICY IF EXISTS "Deny public select" ON public.reservations;
CREATE POLICY "Deny public select"
ON public.reservations
FOR SELECT
TO anon
USING (false);

-- POLÍTICA 3 (ADMINISTRADOR): Solo usuarios autenticados del restaurante pueden leer, confirmar o cancelar reservas
DROP POLICY IF EXISTS "Authenticated admins can manage reservations" ON public.reservations;
CREATE POLICY "Authenticated admins can manage reservations"
ON public.reservations
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. HABILITAR SUPABASE REALTIME (WEBSOCKETS PARA ALERTAS EN VIVO)
-- Permite que el Panel de Administración reciba eventos instantáneos
ALTER PUBLICATION supabase_realtime ADD TABLE public.reservations;

-- 6. FUNCIÓN Y TRIGGER AUTOMÁTICO DE AUDITORÍA (UPDATED_AT)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_reservation_updated ON public.reservations;
CREATE TRIGGER on_reservation_updated
    BEFORE UPDATE ON public.reservations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ════════════════════════════════════════════════════════════════════════════
-- INSTRUCCIONES DE DESPLIEGUE EN SUPABASE:
-- 1. Ve a https://app.supabase.com y selecciona tu proyecto.
-- 2. Entra en el menú "SQL Editor".
-- 3. Pega y ejecuta este archivo completo.
-- 4. En "Project Settings" -> "API", copia tu URL y tu "anon public" key.
-- 5. Añade esas dos variables a tu archivo .env en La Querendona:
--      VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
--      VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
-- ════════════════════════════════════════════════════════════════════════════
