(function () {
    "use strict";

    var MarkdownGenerator = function () {

        this.generate = function (context) {

            var request  = context.getCurrentRequest(),
                exchange = request.getLastExchange();

            return "## " + request.name + "\n\n" +
                   "### Request\n\n" +
                   requestMarkdown(exchange) +  "\n\n" +

                   "### Response\n\n" +
                   responseMarkdown(exchange);
        }
    };

    MarkdownGenerator.identifier           = "com.tantalic.PawExtensions.MarkdownGenerator";
    MarkdownGenerator.title                = "Markdown";
    MarkdownGenerator.fileExtension        = "md";
    MarkdownGenerator.languageHighlighter  = "markdown";

    registerCodeGenerator(MarkdownGenerator);;


    // Private functions

    function requestMarkdown (exchange) {
        var body        = exchange.requestBody,
            contentType = exchange.getRequestHeaderByName("Content-Type");

        // "Pretty Print" JSON
        if ( contentType && contentType.indexOf("json") !== -1 ) {
            var json = JSON.parse(body);
            if (json) {
                body = JSON.stringify(json, null, 4);
            }
        }

        return "```http" +
               "\n" +
               exchange.requestHeaderString +
               body +
               "\n" +
               "```";
    }

    function responseMarkdown (exchange) {
        var body        = exchange.responseBody,
            contentType = exchange.getResponseHeaderByName("Content-Type");

        // "Pretty Print" JSON
        if ( contentType && contentType.indexOf("json") !== -1 ) {
            var json = JSON.parse(body);
            if (json) {
                body = JSON.stringify(json, null, 4);
            }
        }

        return "```http" +
               "\n" +
               exchange.responseHeaderString +
               body +
               "\n" +
               "```";
    }

})();
