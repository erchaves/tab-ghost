(function ($) {
    var myGhost;
    var Ghost = function (options) {
        //todo: pass in options to extend defaults
        //and move more vars to properties.
        var _this = this;
        var timeoutVal = 500;
        var timer;
        var isButtonToggleActive = false;
        var isTimerToggleActive = false;
        var canHazFanzyIcon = false;
        var ghostEmoji = canHazFanzyIcon ? '👻' : '^OO^';
        var ghostText = ghostEmoji;

        var props = {
            init: function (options) {
                _this.$button = options.$button;
                _this.$input = options.$input;
                _this.render();
            },
            reset: function () {
                isButtonToggleActive = false;
                isTimerToggleActive = false;
                ghostText = ghostEmoji;
            },
            render: function () {
                _this.renderButton();
                _this.writeTitle(ghostText);
            },
            writeTitle: function (text) {
                document.title = text;
            },
            onTimerInterval: function () {
                var ghostInputText = _this.$input.val() || '?';
                ghostText = isTimerToggleActive ? ghostEmoji : ghostInputText;
                _this.writeTitle(ghostText);
                isTimerToggleActive = !isTimerToggleActive;
            },
            renderButton: function () {
                var buttonText = isButtonToggleActive ? 'knock it off' : 'haunt';
                _this.$button.text(buttonText);
            },
            onButtonToggle: function () {
                var wasActive = isButtonToggleActive;
                isButtonToggleActive = !isButtonToggleActive;
                if (wasActive) {
                    _this.stop();
                } else {
                    _this.start();
                }
            },
            start: function () {
                timer = window.setInterval(function(){
                    _this.onTimerInterval();
                }, timeoutVal);
                _this.render();
            },
            stop: function () {
                clearInterval(timer);
                _this.reset();
                _this.render();
            }
        };
        
        for (prop in props) {
            this[prop] = props[prop];
        }
        return this;
    };

    myGhost = new Ghost();

    $(function () {
        var $form = $('#ghostForm');
        var $input = $('#ghostForm input');
        var $button = $('#ghostForm button');
        var ghostText = '';
        
        myGhost.init({
            $button: $button,
            $input: $input
        });

        $form.submit(function (e) {
            e.preventDefault();
            myGhost.onButtonToggle();
        });
        $input.focus(function () {
            myGhost.stop();
        });
    });

    // for easy testing.
    // todo: remove before pushing to prod.  Super important.
    window.myGhost = myGhost;
})(jQuery);