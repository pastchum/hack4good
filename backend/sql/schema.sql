-- Enable UUID Extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Enum Type for Request Status
CREATE TYPE request_status AS ENUM ('pending', 'approved', 'rejected');

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- Vouchers Table
CREATE TABLE vouchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    denomination INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- User Vouchers Table
CREATE TABLE user_vouchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    voucher_id UUID REFERENCES vouchers(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- Items Table
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    stock INT DEFAULT 0,
    voucher_cost INT NOT NULL,
    is_available BOOLEAN DEFAULT true,
    product_image TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Voucher Requests Table
CREATE TABLE voucher_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    positive_behaviour TEXT NOT NULL,
    requested_vouchers INT NOT NULL,
    status request_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT now()
);

-- Item Requests Table
CREATE TABLE item_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    cost INT NOT NULL,
    status request_status DEFAULT 'pending',
    is_preorder BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);
