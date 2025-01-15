-- Seed Vouchers
INSERT INTO vouchers (id, denomination, description, created_at)
VALUES
    (gen_random_uuid(), 10, '10-point voucher', now()),
    (gen_random_uuid(), 20, '20-point voucher', now());

-- Seed Admin User
INSERT INTO users (id, email, phone, created_at)
VALUES
    (gen_random_uuid(), 'kaungzinye@gmail.com', '1234567890', now());
