-- テーブル: ユーザー
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- テーブル: ウォレット
CREATE TABLE wallets (
    wallet_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    currency_type ENUM('local_currency', 'cash') NOT NULL,
    balance DECIMAL(18, 8) NOT NULL DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- テーブル: 取引
CREATE TABLE trades (
    trade_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    trade_type ENUM('buy', 'sell') NOT NULL,
    amount DECIMAL(18, 8) NOT NULL,
    rate DECIMAL(18, 8) NOT NULL,
    status ENUM('open', 'completed', 'cancelled') NOT NULL DEFAULT 'open',
    matched_trade_id BIGINT,
    matched_rate DECIMAL(18, 8),
    matched_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- テーブル: 取引履歴
CREATE TABLE trade_history (
    history_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    trade_id BIGINT NOT NULL,
    trade_type ENUM('buy', 'sell') NOT NULL,
    amount DECIMAL(18, 8) NOT NULL,
    rate DECIMAL(18, 8) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (trade_id) REFERENCES trades(trade_id) ON DELETE CASCADE
);

-- テーブル: レート
CREATE TABLE rates (
    rate_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    currency_pair VARCHAR(20) NOT NULL,
    rate DECIMAL(18, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
