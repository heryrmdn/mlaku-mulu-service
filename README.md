# Mlaku Mulu Service

Service for Mlaku Mulu operations.

## Technology Stack

- Node.js 20
- NestJS
- MySQL
- Git
- Docker

## Installation

### 1. Environment Setup

```bash
git clone https://github.com/heryrmdn/mlaku-mulu-service.git
cd mlaku-mulu-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create `.env` file from template:

```bash
cp .env.example .env
```

Fill in appropriate values in the `.env` file.

## Project setup

```bash
$ npm install
```

## Running the Application

### Development

```bash
# development
npm run start

# watch mode
npm run start:dev
```

### Build

```bash
npm run build
```

### Migration

```bash
npm run migration:create --name=user
npm run migrate:up
npm run migrate:down
```

### Docker

```bash
docker build -t mlaku-mulu-service .
docker-compose up -d
```

## API Documentation

We provide comprehensive API documentation through Postman - [Postman Collections](https://dicoding-8596.postman.co/workspace/Mlaku-Mulu~f62d7531-09bf-4a6e-aa0f-4a6f6f937eea/collection/26807504-c9a7e00e-e24d-4267-aa41-bafbeb23edc3?action=share&source=copy-link&creator=26807504)

## Stay in touch

- Author - [Hery Rhamadan](www.linkedin.com/in/hery-rhamadan)
- Linkedin - [www.linkedin.com/in/hery-rhamadan](www.linkedin.com/in/hery-rhamadan)

## License

This project is licensed under the MIT License.