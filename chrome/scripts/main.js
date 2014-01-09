function injectGittipButton() {
    var username = getUsername();

    if (username !== null) {
        $.ajax({
            'url': 'https://www.gittip.com/' + username + '/public.json',
            'success': function(gittipUser) {
                var donations = gittipUser.receiving;
                var signed_in = $('.signin').length === 0;

                if ($('.vcard').length > 0) {
                    injectGittipButtonUser(username, donations, signed_in);
                } else {
                    injectGittipButtonRepo(username, donations, signed_in);
                }
            }
        });
    }
}

function getUsername() {
    var href = window.location.href;
    var _username = href.match('github.com/(.[^/]*)');

    var reserved_usernames = ['notifications', 'explore', 'blog', 'new', 'organizations',
                          'settings', 'logout', 'stars', 'dashboard', 'repositories',
                          'site', 'security', 'contact', 'about', 'trending', 'login'];

    if (_username !== null && _username.length == 2) {
        if (reserved_usernames.indexOf(_username[1]) == -1) {
            return _username[1];
        }
    }

    return null;
}

function injectGittipButtonRepo(username, donations, signed_in) {
    if (!signed_in) {
        $('.pagehead-actions')
            .prepend($('.pagehead-actions li:first-child').clone());

        $('.pagehead-actions li:first-child a:first-child')
            .attr('title', 'Gittip')
            .attr('href', 'https://www.gittip.com/' + username)
            .removeAttr('data-method data-remote')
            .removeClass('js-toggler-target star-button unstarred upwards');

        $('.pagehead-actions li:first-child a:first-child')
            .html('<span class="octicon octicon-heart"></span>Gittip');

        $('.pagehead-actions li:first-child a:last-child')
            .attr('href', 'https://www.gittip.com/' + username)
            .text(' $' + donations + ' ')
            .removeClass('js-social-count');
    } else {
        $('.pagehead-actions')
            .prepend($('.pagehead-actions li:nth-child(2)').clone());

        $('.pagehead-actions li:first-child div')
            .removeAttr('class');

        $('.pagehead-actions li:first-child div a:first-child')
            .remove();

        $('.pagehead-actions li:first-child div a:first-child')
            .attr('title', 'Gittip')
            .attr('href', 'https://www.gittip.com/' + username)
            .removeAttr('data-method data-remote')
            .removeClass('js-toggler-target star-button unstarred upwards');

        $('.pagehead-actions li:first-child div a:first-child .text')
            .text('Gittip');

        $('.pagehead-actions li:first-child div a:first-child .octicon')
            .removeClass('octicon-star')
            .addClass('octicon-heart');

        $('.pagehead-actions li:first-child div a:last-child')
            .attr('href', 'https://www.gittip.com/' + username)
            .text(' $' + donations + ' ')
            .removeClass('js-social-count');
    }
}

function injectGittipButtonUser(username, donations, signed_in) {
    $('.tabnav-right')
        .prepend($('.tabnav-right > .user-following-container').clone());

    if (signed_in) {
        $('.tabnav-right > span:first-child > span:first-child')
            .remove();
    }

    $('.tabnav-right > span:first-child')
        .removeClass('user-following-container');

    $('.tabnav-right > span:first-child > span')
        .removeAttr('class');

    $('.tabnav-right > span:first-child > span > a')
        .attr('href', 'https://www.gittip.com/' + username)
        .html('<span class="octicon octicon-heart"></span>Gittip');
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
        injectGittipButton();
	}
	}, 10);
});
