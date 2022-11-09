// Funções de requisição


const reqMinhaConta = (callback, token, userName) => {
    $.ajax({
        type: 'get',
        url: `/api/v1/user/minha_conta?user_name=${userName}`,
        myCallback: callback,
        headers: {
        "Authorization": `Bearer ${token}`
        },
        success: function (data) {
            this.myCallback(data);
        },
        error: function (data, status) {
            this.myCallback(data['responseJSON']);
        }
    });
}

const reqUpdateMinhaConta = (callback, token, userName,dados) => {
    $.ajax({
        type: 'put',
        url: `/api/v1/user/minha_conta?user_name=${userName}`,
        myCallback: callback,
        headers: {
        "Authorization": `Bearer ${token}`
        },
        contentType: "application/json",
        data : JSON.stringify(dados),
        success: function (data) {
            this.myCallback(data);
        },
        error: function (data, status) {
            this.myCallback(data['responseJSON']);
        }
    });
}

const uploadAvatar = (callback, token, arquivo) => {
    let form = new FormData();
    form.append("avatar", arquivo);
    $.ajax({
        type: 'post',
        url: `/api/v1/user/minha_conta/avatar_upload`,
        myCallback: callback,
        headers: {
        "Authorization": `Bearer ${token}`
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form,
        success: function (data) {
            this.myCallback(JSON.parse(data));
        },
        error: function (data, status) {
            this.myCallback(data['responseJSON']);
        }
    });

};


const reqAlterarSenha = (callback, token, userName,dados) => {
    $.ajax({
        type: 'put',
        url: `/api/v1/user/minha_conta/alterar_senha?user_name=${userName}`,
        myCallback: callback,
        headers: {
        "Authorization": `Bearer ${token}`
        },
        contentType: "application/json",
        data : JSON.stringify(dados),
        success: function (data) {
            this.myCallback(data);
        },
        error: function (data, status) {
            this.myCallback(data['responseJSON']);
        }
    });
}



// Funções gerais

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const alterarFoto = (e)=>{
    $('#modal-principal').modal('show');
    const titulo = $('#modal-principal .modal-title')
    const conteudo = $('#modal-principal .modal-body')
    titulo.html('<i class="far fa-id-badge me-2"></i> Novo avatar')
    $('#modal-principal>div>div').css('min-height', 'auto')

    conteudo.html(`
    <form id='troca_avatar_usuario'>
    <div class="mb-3">
    <label for="avatar_usuario" class="form-label">
    Selecione seu avatar</label>
    <input class="form-control" type="file" id="avatar_usuario" required>
  </div>
  
  <div class='small'>
  <div id="img_info"></div>
  </div>
  
  <div class='mt-3 text-end'>
                <button type="submit" onclick="carregamento(this)" class="btn btn-outline-secondary w-100 border border-secondary " id='btn_password'><i class="fas fa-save me-2"></i>Gravar</button>
                </div>
    </form>
    `)
}

const alterarSenha = (e) =>{
    $('#modal-principal').modal('show');
    const titulo = $('#modal-principal .modal-title')
    const conteudo = $('#modal-principal .modal-body')
    titulo.html('<i class="fas fa-key me-2"></i>Troca de senha')
    conteudo.html(`
    <div class=''>
    <div class="row">

        <div class="col-md-6">
            <form id='alterar_senha_form' class="form-floating mb-3">
                <div class="form-floating">
                    <input type="password" class="form-control" id="user_password" required placeholder="Password">
                    <label for="user_password">Password</label>
                </div>
                <div class='mt-3 text-end'>
                <button type="submit" onclick="carregamento(this)" class="btn btn-outline-secondary w-100 border border-secondary " disabled id='btn_password'><i class="fas fa-save me-2"></i>Alterar</button>
                </div>
            </form>
        </div>
        <div class="col-md-6">
            <div class='text-muted'><span id='minimo' class='text-danger'><i class="fas fa-times me-2"></i></span>6 a 15 Caracteres.</div>
            <div class='text-muted'><span id='maiusculo' class='text-danger'><i class="fas fa-times me-2"></i></span>Letra Maiuscula.</div>
            <div class='text-muted'><span id='minusculo' class='text-danger'><i class="fas fa-times me-2"></i></span>Letra Minuscula.</div>
            <div class='text-muted'><span id='numericos' class='text-danger'><i class="fas fa-times me-2"></i></span>Numeros.</div>
            <div class='text-muted'><span id='especiais' class='text-danger'><i class="fas fa-times me-2"></i></span>Caractere Especial.</div>
        </div>
    </div>
</div>
    `)
    $('#modal-principal>div>div').css('min-height', 'auto')
};

const editarAcessos = (e) => {
    const userId = e.name.replace('acessos_usuario-', '')
    const userDataJSON = JSON.parse($(`#usuario-${userId}`).html())
    $('#modal-editar-dados-usuario>div>div').css('min-height', 'auto')
    // console.log(usuario)
    const titulo = $('#modal-editar-dados-usuario .modal-title')
    const conteudo = $('#modal-editar-dados-usuario .modal-body')
    const footer = $('#modal-editar-dados-usuario .modal-footer')
    const buttons = $('#modal-editar-dados-usuario .modal-buttons')
    footer.html(`<button type="button" class="btn btn-of-primary" data-bs-dismiss="modal"><i class="far fa-times-circle me-2" aria-hidden="true"></i>Fechar</button>`)
    // DATA
    const dataCriadoem = new Date(userDataJSON['criado_em']);
    const criadoEm = ((dataCriadoem.getDate())) + "/" + ((dataCriadoem.getMonth() + 1)) + "/" + dataCriadoem.getFullYear();
    let dataUpdate = userDataJSON['atualizado_em']
    if (dataUpdate != null) {
        const dataUpdate2 = new Date(dataUpdate);
        dataUpdate = ((dataUpdate2.getDate())) + "/" + ((dataUpdate2.getMonth() + 1)) + "/" + dataUpdate2.getFullYear();
    } else {
        dataUpdate = '-'
    }
    // Reset
    titulo.html('')
    conteudo.html('')

    // Montando os campos de formulario

    titulo.html(`<i class="fas fa-user-edit me-2"></i> Editar Perfil`)
    conteudo.html(`
                <form class="form-floating" id="editar-dados-usuario-form" name='${userId}'>
                <div class="row">
                    <div class="col-md-6 mt-2 form-floating">
                        <input type="text" class="form-control" id="nome_usuario_form" placeholder="Nome" value="${userDataJSON['nome']}" required>
                                        <label for="nome_usuario_form" class='ms-2'>Nome</label>
                    </div>
                    <div class="col-md-6 mt-2 form-floating">
                    <input type="text" class="form-control" id="email_usuario_form" placeholder="E-mail" value="${userDataJSON['email']}" required>
                                    <label for="email_usuario_form" class='ms-2'>E-mail</label>
                </div>
                
                </div>
                <div class='mt-3 text-end'>
                <button type="submit" onclick="carregamento(this)" class="btn btn-outline-secondary w-100 border border-secondary "><i class="fas fa-save me-2"></i>Gravar</button>
                </div>
                </form>
      
    `)

    if (userDataJSON['ativo'] == 1) {
        $('#usuario_ativo_form').prop("checked", true)
    } else {
        $('#usuario_ativo_form').prop("checked", false)
    }
};




// Execução

const nome_usuario = localStorage['usuario']
const token = localStorage['token']
reqMinhaConta((a) => {
    // console.log(a)
    if (a.status == 'success') {
        const data = a.data

        localStorage['avatar'] = data['avatar']
        // DATA
    const dataCriadoem = new Date(data['criado_em']);
    const criadoEm = ((dataCriadoem.getDate())) + "/" + ((dataCriadoem.getMonth() + 1)) + "/" + dataCriadoem.getFullYear();
    let dataUpdate = data['atualizado_em']
    if (dataUpdate != null) {
        const dataUpdate2 = new Date(dataUpdate);
        dataUpdate = ((dataUpdate2.getDate())) + "/" + ((dataUpdate2.getMonth() + 1)) + "/" + dataUpdate2.getFullYear();
    } else {
        dataUpdate = '-'
    }
        const ativo = data['ativo'] == 1 ? `<span class="badge bg-success text-white">
        <i class="fas fa-check me-2"></i>Ativo
      </span>` : `<span class="badge bg-danger text-white">
      <i class="fas fa-check me-2"></i>Inativo
    </span>`
        $("#conteudo_minha_conta").html(`
        <div class="row">
      <div class="col-md-4">
      <div class='d-none' id='usuario-${data['id']}'>${JSON.stringify(data)}</div>
        <figure class="figure w-100 text-center" id="avatar-img">
          <img src="${data['avatar']}?v=${getRandomIntInclusive(1,1000)}" class="figure-img avatar-img-md shadown-sm" alt="" style="width:416px; max-height:416px;">
        </figure>
        <div class="d-flex">
          <div class="w-100">
            <button class="btn btn-of-primary  btn-sm w-100" name="acessos_usuario-${data['id']}" onclick="alterarFoto(this)"><i class="fas fa-paperclip me-2"></i>Foto</button>
          </div>
          <div class="w-100 ms-1">
            <button class="btn btn-of-primary  btn-sm w-100" name="acessos_usuario-${data['id']}" onclick="alterarSenha(this)"><i class="fas fa-unlock me-2"></i>Senha</button>
          </div>
          <div class="w-100 ms-1">
          <button class="btn btn-of-primary  btn-sm w-100" data-bs-target="#modal-editar-dados-usuario" data-bs-toggle="modal" data-bs-dismiss="modal" name="acessos_usuario-${data['id']}" onclick="editarAcessos(this)"><i class="fas fa-edit me-2" aria-hidden="true"></i>Editar</button>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <ul class="list-group  list-group-flush">
          <span id="id_usuario" class="d-none">${data['id']}</span>
          <span id="acessos_usuario-${data['id']}" class="d-none">${JSON.stringify(data['acessos'])}</span>
          <li class="list-group-item"><strong>Nome:</strong> ${titleCase(data['nome'])}</li>
          <li class="list-group-item"><strong>Usuário:</strong> ${data['nome_usuario']}</li>
          <li class="list-group-item"><strong>Cargo:</strong> ${data['cargo']}</li>
          <li class="list-group-item"><strong>Matricula:</strong> ${data['matricula']}</li>
          <li class="list-group-item"><strong>E-mail:</strong> ${data['email']}</li>
          <li class="list-group-item"><strong>Criado em:</strong> ${criadoEm}</li>
          <li class="list-group-item"><strong>Atualizado em:</strong> ${dataUpdate}</li>
          <li class="list-group-item"><strong>Status:</strong> ${ativo} </li>
        </ul>
        <div class="form-floating mt-2">
          <textarea class="form-control bg-white" placeholder="Leave a comment here" id="floatingTextarea" style="min-height: 138px;" readonly>${data['observacao']}</textarea>
          <label for="floatingTextarea">Observação:</label>
        </div>
      </div>
    </div>
        `)

    } else {
        const data = a
      
    }

}, token, nome_usuario)

// Eventos
$(document).on('submit', '#editar-dados-usuario-form', (e)=>{

    e.preventDefault()
    // Load
    $('#editar-dados-usuario-form').find('button[type=submit]').html(`
     <div class="text-center">
         <div class="spinner-border spinner-border-sm" role="status">
             <span class="visually-hidden">Loading...</span>
         </div>
     </div>
     `)
    $('#editar-dados-usuario-form').find('button[type=submit]').attr('disabled', 'disabled')
    const  nome = $("#nome_usuario_form")
    const  email = $('#email_usuario_form')

    const payload = {
        "nome" : nome.val(),
        "email" : email.val()
    }

    reqUpdateMinhaConta((a) => {
        // console.log(a)
        if (a.status == 'success') {
            const data = a.data
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alerta edição de usuário.`, `<div class="alert text-center text-success" role="alert">
                <strong>${data}</strong>
            </div>`)
            $('#editar-dados-usuario-form').find('button[type=submit]').html(`
            <i class="fas fa-save me-2"></i>Gravar</button>
     `)
            setTimeout(() => { document.location.href = '/minha_conta'; }, 1000)

        } else {
            const data = a
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alerta edição de usuário.`, `<div class="alert text-center text-danger" role="alert">
            <strong>${JSON.stringify(data)}</strong>
        </div>`)
          
        }

    }, token, nome_usuario, payload)


});

$(document).on('keyup', '#user_password', (e)=>{
    let maxCaracters = 15
    let mimCaracters = 6
    let letrasMaiusculas = /[A-Z]/;
    let letrasMinusculas = /[a-z]/;
    let numeros = /[0-9]/;
    let caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

    let validator = []

    if (letrasMaiusculas.test($('#user_password').val())) {
        $('#maiusculo').removeClass('text-danger')
        $('#maiusculo').addClass('text-success')
        $('#maiusculo').html('<i class="fas fa-check me-2">')
        validator.push('maiuscula')
    } else {
        $('#maiusculo').removeClass('text-success')
        $('#maiusculo').addClass('text-danger')
        $('#maiusculo').html('<i class="fas fa-times me-2">')
        
    }
    if (letrasMinusculas.test($('#user_password').val())) {
        $('#minusculo').removeClass('text-danger')
        $('#minusculo').addClass('text-success')
        $('#minusculo').html('<i class="fas fa-check me-2">')
        validator.push('minusculo')
    } else {
        $('#minusculo').removeClass('text-success')
        $('#minusculo').addClass('text-danger')
        $('#minusculo').html('<i class="fas fa-times me-2">')

    }
    if (numeros.test($('#user_password').val())) {
        $('#numericos').removeClass('text-danger')
        $('#numericos').addClass('text-success')
        $('#numericos').html('<i class="fas fa-check me-2">')
        validator.push('numericos')
    } else {
        $('#numericos').removeClass('text-success')
        $('#numericos').addClass('text-danger')
        $('#numericos').html('<i class="fas fa-times me-2">')

    }
    if (caracteresEspeciais.test($('#user_password').val())) {
        $('#especiais').removeClass('text-danger')
        $('#especiais').addClass('text-success')
        $('#especiais').html('<i class="fas fa-check me-2">')
        validator.push('especiais')
    } else {
        $('#especiais').removeClass('text-success')
        $('#especiais').addClass('text-danger')
        $('#especiais').html('<i class="fas fa-times me-2">')

    }
    if ($('#user_password').val().length > mimCaracters && $('#user_password').val().length < maxCaracters) {
        $('#minimo').removeClass('text-danger')
        $('#minimo').addClass('text-success')
        $('#minimo').html('<i class="fas fa-check me-2">')
        validator.push('minimo')
    } else {
        $('#minimo').removeClass('text-success')
        $('#minimo').addClass('text-danger')
        $('#minimo').html('<i class="fas fa-times me-2">')

    }

    if (validator.length == 5) {
        $('#btn_password').removeAttr('disabled', 'disabled')
    } else {
        $('#btn_password').attr('disabled', 'disabled')
    }

});

$(document).on('submit', '#alterar_senha_form', (e)=>{
    e.preventDefault()

    // Load
    $('#alterar_senha_form').find('button[type=submit]').html(`
     <div class="text-center">
         <div class="spinner-border spinner-border-sm" role="status">
             <span class="visually-hidden">Loading...</span>
         </div>
     </div>
     `)
    $('#alterar_senha_form').find('button[type=submit]').attr('disabled', 'disabled')

    const password = $('#user_password')

    const payload = {
        "password" : password.val()
    }
    reqAlterarSenha((a) => {
        // console.log(a)
        if (a.status == 'success') {
            const data = a.data
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alteração de senha.`, `<div class="alert text-center text-success" role="alert">
                <strong>${data}</strong>
            </div>`)
            $('#alterar_senha_form').find('button[type=submit]').html(`
            <i class="fas fa-save me-2" aria-hidden="true"></i>Alterar
     `)
            setTimeout(() => { 
                deslogar()
            }, 800)

        } else {
            const data = a
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alteração de senha.`, `<div class="alert text-center text-danger" role="alert">
                <strong>${JSON.stringify(data)}</strong>
            </div>`)
          
        }

    }, token, nome_usuario, payload)
})



$(document).on('change', '#troca_avatar_usuario', (e)=>{
    const arquivo = $('#avatar_usuario')[0].files[0];
    const size = arquivo.size
    const type = arquivo.type
    // console.log(arquivo)
    $("#img_info").html(`<strong>Tamanho:</strong> ${formatBytes(size)} <strong>Maximo:</strong> 1 mb<br><strong>Formato:</strong> ${type} <strong>Aceito:</strong> jpeg`)
})

$(document).on('submit', '#troca_avatar_usuario', (e)=>{

    e.preventDefault()
    // console.log($('#avatar_usuario'))
    const arquivo = $('#avatar_usuario')[0].files[0];
    $('#troca_avatar_usuario').find('button[type=submit]').attr('disabled', 'disabled')
    uploadAvatar((a) => {
        if (a.status == 'success') {
            const data = a.data
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alteração Foto.`, `<div class="alert text-center text-success" role="alert">
            <strong>${data}</strong>
        </div>`)
        $('#troca_avatar_usuario').find('button[type=submit]').html(`
        <i class="fas fa-save me-2" aria-hidden="true"></i>Gravar
 `)
        
        setTimeout(() => { 
            window.location.href = '/minha_conta'
        }, 800)
        
        } else {
            const data = a
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alteração Foto.`, `<div class="alert text-center text-success" role="alert">
            <strong>${JSON.stringify(data)}</strong>
        </div>`)
          
        }

    }, token,arquivo)


});