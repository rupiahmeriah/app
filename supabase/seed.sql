INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user) 
    VALUES ('00000000-0000-0000-0000-000000000000', 'bb159260-7954-4fb8-930b-979db739f0ac', 'authenticated', 'authenticated', 'egan@hey.com', '$2a$10$JMhTktCDia5pydvdVN6OqO.1mnCVovUyFjb5vaPPEjBryz41XAY9e', '2023-01-10 06:10:44.229239+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-01-10 06:10:44.233769+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-01-10 06:10:44.209321+00', '2023-01-10 06:10:44.239524+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false);

INSERT INTO public.profiles (id, username, full_name)
VALUES
(
    'bb159260-7954-4fb8-930b-979db739f0ac',
    'egan',
    'Egan Bisma'
);

INSERT INTO public.user_banks (id, user_id, bank_id, bank_name, access_token)
VALUES
(
    1,
    'bb159260-7954-4fb8-930b-979db739f0ac',
    12,
    NULL,
    'access-sandbox-dd66c748-5523-4a3d-964c-0969ea2b1f62'
);