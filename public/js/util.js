define(['jquery'], function ($) {

    return {
        queryString: function (key) {
            var param = location.search.substr(1);
            var result = null;
            if (param) {
                var a = param.split('&');
                $.each(a, function (index, item) {
                    var b = item.split('=');
                    if (b[0] == key) {
                        result = b[1];
                        return false;
                    }
                });
            }
           return result;
        }
    }

})