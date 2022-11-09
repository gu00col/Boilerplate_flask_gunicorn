
$(document).on('click', '#passwordVisivel', e => {
    let icone = $('#passwordVisivelIco')
    if (icone.hasClass('fa-eye')) {
        icone.removeClass('fa-eye')
        icone.addClass('fa-eye-slash')
        $('#password').attr('type', 'text')

    } else {
        icone.addClass('fa-eye')
        icone.removeClass('fa-eye-slash')
        $('#password').attr('type', 'password')
    }

})

$(document).on('submit', '#form_login', (e) => {
    $('.load-login').show()
    console.log(e)
})