# Email Checker

This code checks whether an email is valid or not.

## Running Locally

Make sure you have the latest version of Node.js and npm installed.

1. Install dependencies:
   ```sh
   npm install express puppeteer
   ```

2. Run the script:
   ```sh
   node ./emailchecker.js
   ```

The output will be running on localhost:3000.

## To check an email, pass the email as an argument in the URL:

```
http://localhost:3000/check-email?email=rushabhsh@chillreach.org
```

## Running in Docker

A Dockerfile is provided in the repository. To build the Docker image, run the following command in the current working directory:
```sh
docker build -t emailchecker .
```

To run the Docker container, use the following command:
```sh
docker run -p 3000:3000 -d emailchecker
```


## Running from Docker Hub

Pull the Docker image from your Docker Hub repository:
```sh
docker pull iamrushabhshahh/emailchecker:latest
```

Run the Docker container using the pulled image:
```sh
docker run -p 3000:3000 -d iamrushabhshahh/emailchecker:latest
```

Now, you have the image running, and you can access it at http://localhost:3000
