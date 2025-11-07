# MCP Bevy Buddy / MCP Bevy 助手

[English](#english) | [中文](#中文)

---

## English

### Overview

MCP Bevy Buddy is a Model Context Protocol (MCP) server that provides local Bevy examples and source code inspection capabilities. It reads Cargo.toml to detect the Bevy version and provides access to local Bevy examples from your cargo registry.

### Features

- **Bevy Version Detection**: Automatically detects the Bevy version from your project's Cargo.toml
- **Local Examples Access**: Provides access to Bevy examples from your local cargo registry
- **File Tree Navigation**: Generates a structured file tree of available Bevy examples
- **File Content Reading**: Reads specific example files with proper formatting
- **Absolute Path Resolution**: Gets absolute paths to example files for direct access

### Installation

```bash
npm install mcp-bevy-buddy
```

### Usage

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "bevy-buddy": {
      "command": "npx",
      "args": ["bevy-buddy"]
    }
  }
}
```

### Available Tools

#### `bevy-examples`
Lists all available Bevy examples in a structured tree format.

**Response Format:**
```
Bevy version: 0.14
Examples:
+ example_name
  - some_example.rs
```

#### `bevy-example-read`
Reads the content of a specific Bevy example file.

**Parameters:**
- `path` (string): Relative path to the example file

#### `bevy
-example-absolute-path`
Gets the absolute path of a specific Bevy example file.

**Parameters:**
-
 `path` (string): Relative path to the example file

### Development

```bash
# Build the project
npm run build

# Run locally
npm start

# Development workflow
npm run changeset
npm run version
npm run release
```

### Requirements

- Node.js 18+
- Cargo registry with Bevy source code
- Valid Cargo.toml with Bevy dependency

---

## 中文

### 概述

MCP Bevy Buddy 是一个 Model Context Protocol (MCP) 服务器，提供本地 Bevy 示例和源代码检查功能。它通过读取 Cargo.toml 来检测 Bevy 版本，并允许访问您 cargo 注册表中的本地 Bevy 示例。

### 功能特性

- **Bevy 版本检测**：从项目的 Cargo.toml 自动检测 Bevy 版本
- **本地示例访问**：提供对本地 cargo 注册表中 Bevy 示例的访问
- **文件树导航**：生成可用 Bevy 示例的结构化文件树
- **文件内容读取**：以适当格式读取特定示例文件
- **绝对路径解析**：获取示例文件的绝对路径用于直接访问

### 安装

```bash
npm install mcp-bevy-buddy
```

### 使用方法

添加到您的 MCP 客户端配置中：

```json
{
  "mcpServers": {
    "bevy-buddy": {
      "command": "npx",
      "args": ["bevy-buddy"]
    }
  }
}
```

### 可用工具

#### `bevy-examples`
以结构化树形格式列出所有可用的 Bevy 示例。

**响应格式：**
```
Bevy 版本: 0.14
示例:
+ 示例名称
  - 某个示例.rs
```

#### `bevy-example-read`
读取特定 Bevy 示例文件的内容。

**参数：**
- `path` (字符串)：示例文件的相对路径

#### `bevy-example-absolute-path`
获取特定 Bevy 示例文件的绝对路径。

**参数：**
- `path` (字符串)：示例文件的相对路径

### 开发

```bash
# 构建项目
npm run build

# 本地运行
npm start

# 开发工作流
npm run changeset
npm run version
npm run release
```

### 要求

- Node.js 18+
- 包含 Bevy 源代码的 cargo 注册表
- 包含 Bevy 依赖的有效 Cargo.toml

### 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

### 贡献

欢迎提交 Issue 和 Pull Request！

### 支持

如果您遇到问题，请：
1. 检查您的 Cargo.toml 是否正确配置了 Bevy 依赖
2. 确认 cargo 注册表中存在 Bevy 源代码
3. 在 [GitHub Issues](https://github.com/Blackjack200/mcp-bevy-buddy/issues) 提交问题