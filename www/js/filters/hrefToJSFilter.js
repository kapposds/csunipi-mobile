app.filter('hrefToJS', function ($sce, $sanitize) {
    return function (text) {
        var regex = /href="([\S]+)"/g;

        if (RegExp.$1.startsWith("#/app")) //if url is starting with #/app dont replace href 
        {
        	return text;
        }
        else
        {	
	        //replace href with window.open() 														//_blank to open inappbrowser
	        var newString = $sanitize(text).replace(regex, "onClick=\"window.open('$1', '_system', 'location=yes')\"");
	        return $sce.trustAsHtml(newString);
        }
    }
});