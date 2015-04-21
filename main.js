(function ($) {
    $(function () {
        var $form = $('#ghostForm');
        var $input = $('#ghostForm input');
        var ghostText = '';

        $form.submit(function (e) {
            e.preventDefault();
            ghostText = $input.val();
            document.title = ghostText;
        });
    });
})(jQuery);