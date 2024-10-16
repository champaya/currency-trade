@echo off

:: プロジェクトルートディレクトリ
set BASE_DIR=%~dp0src\main\java\com\example\currency

:: ディレクトリ作成
mkdir %BASE_DIR%\controller
mkdir %BASE_DIR%\domain
mkdir %BASE_DIR%\repository
mkdir %BASE_DIR%\service
mkdir %BASE_DIR%\form
mkdir %BASE_DIR%\websocket

:: ファイル作成
:: Form classes
echo package com.example.demo.form; > %BASE_DIR%\form\UserForm.java
echo package com.example.demo.form; > %BASE_DIR%\form\WalletForm.java
echo package com.example.demo.form; > %BASE_DIR%\form\TradeForm.java
echo package com.example.demo.form; > %BASE_DIR%\form\TradeHistoryForm.java

:: Domain classes
echo package com.example.demo.domain; > %BASE_DIR%\domain\User.java
echo package com.example.demo.domain; > %BASE_DIR%\domain\Wallet.java
echo package com.example.demo.domain; > %BASE_DIR%\domain\Trade.java
echo package com.example.demo.domain; > %BASE_DIR%\domain\Rate.java
echo package com.example.demo.domain; > %BASE_DIR%\domain\TradeHistory.java
echo package com.example.demo.domain; > %BASE_DIR%\domain\CurrencyType.java
echo package com.example.demo.domain; > %BASE_DIR%\domain\TradeType.java
echo package com.example.demo.domain; > %BASE_DIR%\domain\TradeStatus.java

:: Repository classes
echo package com.example.demo.repository; > %BASE_DIR%\repository\UserRepository.java
echo package com.example.demo.repository; > %BASE_DIR%\repository\WalletRepository.java
echo package com.example.demo.repository; > %BASE_DIR%\repository\TradeRepository.java
echo package com.example.demo.repository; > %BASE_DIR%\repository\RateRepository.java
echo package com.example.demo.repository; > %BASE_DIR%\repository\TradeHistoryRepository.java

:: Service classes
echo package com.example.demo.service; > %BASE_DIR%\service\UserService.java
echo package com.example.demo.service; > %BASE_DIR%\service\WalletService.java
echo package com.example.demo.service; > %BASE_DIR%\service\TradeService.java
echo package com.example.demo.service; > %BASE_DIR%\service\RateService.java
echo package com.example.demo.service; > %BASE_DIR%\service\TradeHistoryService.java

:: Controller classes
echo package com.example.demo.controller; > %BASE_DIR%\controller\UserController.java
echo package com.example.demo.controller; > %BASE_DIR%\controller\WalletController.java
echo package com.example.demo.controller; > %BASE_DIR%\controller\TradeController.java
echo package com.example.demo.controller; > %BASE_DIR%\controller\TradeHistoryController.java

:: WebSocket classes
echo package com.example.demo.websocket; > %BASE_DIR%\websocket\RateWebSocketController.java
echo package com.example.demo.websocket; > %BASE_DIR%\websocket\WebSocketConfig.java
echo package com.example.demo.websocket; > %BASE_DIR%\websocket\RateMessage.java


echo MVC構造のディレクトリとファイルが作成されました。
pause
