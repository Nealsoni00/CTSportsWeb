$(function() {
    console.log( "ready!" );
    if (isMobileDevice()) {
        $('#previewVid').hide();
    }
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        let form = $(this);
        $.ajax({
            url: '/send',
            data: form.serialize(),
            error: function() {
                form.hide();
                $('#responseInfo').fadeIn();
                $('#responseText').html('An error has occurred. Please reload the page and try again.');
            },
            success: function(data) {
                form.hide();
                $('#responseInfo').fadeIn();
                $('#responseText').html(`Thanks for contacting us, ${$('#nameInput').val()}, and we'll be in touch shortly.`)
            },
            type: 'POST'
        });
    });
});

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
