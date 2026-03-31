import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/", new StaticHandler());
        server.createContext("/wsdl", new SoapHandler());
        server.setExecutor(null);
        System.out.println("Starting SOAP service on http://localhost:8080/");
        server.start();
    }

    static class StaticHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            if (!t.getRequestMethod().equalsIgnoreCase("GET")) {
                t.sendResponseHeaders(405, -1);
                return;
            }
            String response = "<!DOCTYPE html>\n" +
                    "<html lang=\"en\">\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                    "    <title>Square Calculator</title>\n" +
                    "    <style>\n" +
                    "        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n" +
                    "        .container { background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 100%; }\n" +
                    "        h1 { color: #333; margin-bottom: 5px; }\n" +
                    "        .author { color: #777; font-style: italic; margin-bottom: 30px; }\n" +
                    "        input[type=\"number\"] { width: calc(100% - 22px); padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; }\n" +
                    "        button { background-color: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; font-size: 16px; cursor: pointer; transition: background-color 0.3s; width: 100%; }\n" +
                    "        button:hover { background-color: #0056b3; }\n" +
                    "        .result { margin-top: 20px; font-size: 18px; font-weight: bold; color: #28a745; min-height: 24px; }\n" +
                    "    </style>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "    <div class=\"container\">\n" +
                    "        <h1>Square Calculator</h1>\n" +
                    "        <div class=\"author\">developed by Roshika Arun</div>\n" +
                    "        \n" +
                    "        <input type=\"number\" id=\"num\" placeholder=\"Enter a number\">\n" +
                    "        <button onclick=\"calculateSquare()\">Calculate</button>\n" +
                    "        \n" +
                    "        <div class=\"result\" id=\"resultText\"></div>\n" +
                    "    </div>\n" +
                    "\n" +
                    "    <script>\n" +
                    "        function calculateSquare() {\n" +
                    "            const num = document.getElementById('num').value;\n" +
                    "            if (!num) {\n" +
                    "                document.getElementById('resultText').innerText = \"Please enter a number.\";\n" +
                    "                document.getElementById('resultText').style.color = \"#dc3545\";\n" +
                    "                return;\n" +
                    "            }\n" +
                    "\n" +
                    "            const soapRequest = `<?xml version=\"1.0\" encoding=\"utf-8\"?>\\n` +\n" +
                    "                `<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\\n` +\n" +
                    "                `  <soap:Body>\\n` +\n" +
                    "                `    <calculateSquare xmlns=\"http://localhost:8080/wsdl\">\\n` +\n" +
                    "                `      <number>${num}</number>\\n` +\n" +
                    "                `    </calculateSquare>\\n` +\n" +
                    "                `  </soap:Body>\\n` +\n" +
                    "                `</soap:Envelope>`;\n" +
                    "\n" +
                    "            fetch('/wsdl', {\n" +
                    "                method: 'POST',\n" +
                    "                headers: {\n" +
                    "                    'Content-Type': 'text/xml',\n" +
                    "                },\n" +
                    "                body: soapRequest\n" +
                    "            })\n" +
                    "            .then(response => {\n" +
                    "                if (!response.ok) {\n" +
                    "                    throw new Error('Network response was not ok');\n" +
                    "                }\n" +
                    "                return response.text();\n" +
                    "            })\n" +
                    "            .then(str => {\n" +
                    "                const match = str.match(/<.*?result.*?>(\\d+)<\\/.*?result.*?>/);\n" +
                    "                if (match && match[1]) {\n" +
                    "                    document.getElementById('resultText').innerText = `Square of ${num} is ${match[1]}`;\n" +
                    "                    document.getElementById('resultText').style.color = \"#28a745\";\n" +
                    "                } else {\n" +
                    "                    document.getElementById('resultText').innerText = \"Invalid SOAP response\";\n" +
                    "                    document.getElementById('resultText').style.color = \"#dc3545\";\n" +
                    "                }\n" +
                    "            })\n" +
                    "            .catch(error => {\n" +
                    "                console.error(\"Error:\", error);\n" +
                    "                document.getElementById('resultText').innerText = \"Error calling SOAP service. Check console.\";\n" +
                    "                document.getElementById('resultText').style.color = \"#dc3545\";\n" +
                    "            });\n" +
                    "        }\n" +
                    "    </script>\n" +
                    "</body>\n" +
                    "</html>";

            t.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            byte[] responseBytes = response.getBytes(StandardCharsets.UTF_8);
            t.sendResponseHeaders(200, responseBytes.length);
            OutputStream os = t.getResponseBody();
            os.write(responseBytes);
            os.close();
        }
    }

    static class SoapHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            if (!t.getRequestMethod().equalsIgnoreCase("POST")) {
                t.sendResponseHeaders(405, -1);
                return;
            }

            InputStream is = t.getRequestBody();
            String requestBody = new String(is.readAllBytes(), StandardCharsets.UTF_8);
            System.out.println("Received SOAP Request...");
            
            int number = 0;
            try {
                Matcher m = Pattern.compile("<(?:\\w+:)?number[^>]*>\\s*(\\d+)\\s*</(?:\\w+:)?number>").matcher(requestBody);
                if (m.find()) {
                    number = Integer.parseInt(m.group(1));
                }
            } catch (Exception e) {
                System.err.println("Error parsing XML: " + e.getMessage());
            }

            long square = (long) number * number;

            String soapResponse = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <calculateSquareResponse xmlns=\"http://localhost:8080/wsdl\">\n" +
                    "      <result>" + square + "</result>\n" +
                    "    </calculateSquareResponse>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>";

            t.getResponseHeaders().set("Content-Type", "text/xml; charset=utf-8");
            byte[] responseBytes = soapResponse.getBytes(StandardCharsets.UTF_8);
            t.sendResponseHeaders(200, responseBytes.length);
            OutputStream os = t.getResponseBody();
            os.write(responseBytes);
            os.close();
        }
    }
}
