1. Users Table
The main table to store user information.

Table Name: users
Columns:
id (UUID, Primary Key, Default: uuid_generate_v4()): Unique user ID.
email (String, Unique): User email.
phone (String, Unique): User's phone number for password reset.
created_at (Timestamp, Default: now()): Date of account creation.
2. Vouchers Table
Stores information about available voucher types.

Table Name: vouchers
Columns:
id (UUID, Primary Key, Default: uuid_generate_v4()): Unique voucher ID.
denomination (Integer): Value of the voucher.
description (Text): Details about the voucher.
created_at (Timestamp, Default: now()): Date when the voucher was created.
3. User Vouchers Table
Tracks the vouchers owned by each user.

Table Name: user_vouchers
Columns:
id (UUID, Primary Key, Default: uuid_generate_v4()): Unique record ID.
user_id (UUID, Foreign Key → users.id): References the user who owns the vouchers.
voucher_id (UUID, Foreign Key → vouchers.id): References the voucher type.
quantity (Integer): Number of vouchers owned.
created_at (Timestamp, Default: now()): Date of record creation.
4. Items Table
Represents items that can be redeemed with vouchers.

Table Name: items
Columns:
id (UUID, Primary Key, Default: uuid_generate_v4()): Unique item ID.
name (String): Name of the item.
description (Text): Details about the item.
stock (Integer, Default: 0): Current stock count.
voucher_cost (Integer): Number of vouchers required for redemption.
is_available (Boolean, Default: true): Indicates if the item is in stock.
created_at (Timestamp, Default: now()): Date when the item was added.
5. Voucher Requests Table
Tracks requests from users to earn vouchers based on positive behavior.

Table Name: voucher_requests
Columns:
id (UUID, Primary Key, Default: uuid_generate_v4()): Unique request ID.
user_id (UUID, Foreign Key → users.id): References the requesting user.
positive_behaviour (Text): Description of the positive behavior.
requested_vouchers (Integer): Number of vouchers requested.
status (Enum: pending, approved, rejected, Default: pending): Status of the request.
created_at (Timestamp, Default: now()): Date of request.
6. Item Requests Table
Tracks user requests to redeem items using vouchers.

Table Name: item_requests
Columns:
id (UUID, Primary Key, Default: uuid_generate_v4()): Unique request ID.
user_id (UUID, Foreign Key → users.id): References the requesting user.
item_id (UUID, Foreign Key → items.id): References the requested item.
quantity (Integer): Number of items requested.
status (Enum: pending, approved, rejected, Default: pending): Status of the request.
is_preorder (Boolean, Default: false): Indicates if it’s a pre-order request.
created_at (Timestamp, Default: now()): Date of request.
Relationships
users → user_vouchers:
One-to-many: A user can own multiple types of vouchers.

vouchers → user_vouchers:
One-to-many: A voucher type can be owned by many users.

users → voucher_requests:
One-to-many: A user can make multiple voucher requests.

users → item_requests:
One-to-many: A user can make multiple item redemption requests.

items → item_requests:
One-to-many: An item can be requested by many users.