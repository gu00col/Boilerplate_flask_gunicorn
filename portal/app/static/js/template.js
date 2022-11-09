const usuarioLogado = localStorage.nome
const usuarioAvatar = localStorage.avatar
// Usuário Logado
$('#usuario_logado').html(usuarioLogado)

if (usuarioAvatar == 'null'){
    const avatarDefault = 'https://asdigital.outraforma.com.br/static/img/avatar/admin/avatar.jpg?v=36'
    $('#avatar-user').html(`<img src="${avatarDefault}" class="img-avatar"></img>`)
}




$('#clientes_form').on('submit', (e)=>{
    $(".load-paginas").show()
});

window.onpageshow = function(){
    $(".load-paginas").hide()
    return $(".load-paginas").hide();
  }

const abrirCliente = (e) =>{
    $(".load-paginas").show()
    window.location.href = '/cliente/' + e.id
    
}

// Eventos de click no menu
$(document).on('click', '#home', (e)=>{
    $(".load-paginas").show()
});
$(document).on('click', '#clientes', (e)=>{
    $(".load-paginas").show()
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


// Funções

function bloquear (e){
    e.preventDefault()
    $(e).attr('disabled','disabled')
}

function carregamento(e){
    $(".load-paginas").show()
}