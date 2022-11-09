

// Execução de Requisições

$(document).ready((rf) => {

    // Funções de requisição do

    const Usuario = (callback, token, chave, valor) => {
        $.ajax({
            type: 'GET',
            url: `/api/v1/admin/user?query={"${chave}": "${valor}"}`,
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



    const Usuarios = (callback, token) => {
        $.ajax({
            type: 'GET',
            url: `/api/v1/admin/user`,
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




    // Funções gerais
    // Preenchimento de senha aleatoria
    function getPassword() {
        var chars = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "abcdefghijklmnopqrstuvwxyz", '!@#$%^&*()-_'];
        var randPwd = [3, 3, 2, 2].map(function (len, i) { return Array(len).fill(chars[i]).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('') }).concat().join('').split('').sort(function () { return 0.5 - Math.random() }).join('')
        return randPwd
    }


    const gerar_password = () => {
        const novo_usuario_password = $('#novo_usuario_password')
        novo_usuario_password.val(getPassword())
    }
    gerar_password()

    const gerar_matricula = () => {
        const now = new Date();
        const mes = ("0" + (now.getMonth() + 1)).slice(-2)
        const ano = now.getFullYear().toString().substr(-2)
        var chars = ["abcdefghijklmnopqrstuvwxyz", "0123456789"];
        var randPwd = [1, 3].map(function (len, i) { return Array(len).fill(chars[i]).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('') }).concat().join('').split('').sort(function () { return 0.5 - Math.random() }).join('')
        $('#novo_usuario_matricula').val(randPwd + mes + ano)


    }

    gerar_matricula()


    const carrega_campos_novo_usuario = () => {
        $('#novo_usuario_form').trigger("reset");
        $('#novo_usuario_form').find('button[type=submit]').removeAttr('disabled', 'disabled')
        $('#alert_novo_usuario_nome_usuario').hide()
        $('#alert_novo_usuario_nome_usuario').html('')

        gerar_password()
        gerar_matricula()

    };


    
    // -----------Execução de Requisições

    // Eventos de mudança das abas 

    $('#usuarios-tab').on('click', (e) => {
        // Variaveis
        const campoUsuarios = $('#campo_usuario')
        const textoUsuarios = $('#texto_usuario')
        const btnBuscar = $('#btn-buscar')
        const todosUsuarios = $('#todos_usuarios')
        const resultadoUsuarios = $('#resultado_usuarios')

        // Reset
        btnBuscar.removeAttr('disabled', 'disabled')
        campoUsuarios.removeAttr('disabled', 'disabled')
        textoUsuarios.removeAttr('disabled', 'disabled')
        todosUsuarios.removeAttr('disabled', 'disabled')
        todosUsuarios.prop('checked', false);
        resultadoUsuarios.html('')
        textoUsuarios.val('')
    })

    $('#acessos-tab').on('click', (e) => {
        // Variaveis
        const campoUsuarios = $('#campo_usuario')
        const textoUsuarios = $('#texto_usuario')
        const btnBuscar = $('#btn-buscar')
        const todosUsuarios = $('#todos_usuarios')
        const resultadoUsuarios = $('#resultado_usuarios')

        // Reset
        btnBuscar.removeAttr('disabled', 'disabled')
        campoUsuarios.removeAttr('disabled', 'disabled')
        textoUsuarios.removeAttr('disabled', 'disabled')
        todosUsuarios.removeAttr('disabled', 'disabled')
        todosUsuarios.prop('checked', false);
        resultadoUsuarios.html('')
        textoUsuarios.val('')
    })

    $('#usuarios-buscar-tab').on('click', (e) => {
        // Variaveis
        const campoUsuarios = $('#campo_usuario')
        const textoUsuarios = $('#texto_usuario')
        const btnBuscar = $('#btn-buscar')
        const todosUsuarios = $('#todos_usuarios')
        const resultadoUsuarios = $('#resultado_usuarios')

        // Reset
        btnBuscar.removeAttr('disabled', 'disabled')
        campoUsuarios.removeAttr('disabled', 'disabled')
        textoUsuarios.removeAttr('disabled', 'disabled')
        todosUsuarios.removeAttr('disabled', 'disabled')
        todosUsuarios.prop('checked', false);
        resultadoUsuarios.html('')
        textoUsuarios.val('')

        // breadcumbs

        $('#usuarios-atual').html('Buscar')
    })
    $('#usuarios-criar-tab').on('click', (e) => {
        // Variaveis
        const campoUsuarios = $('#campo_usuario')
        const textoUsuarios = $('#texto_usuario')
        const btnBuscar = $('#btn-buscar')
        const todosUsuarios = $('#todos_usuarios')
        const resultadoUsuarios = $('#resultado_usuarios')

        // Reset
        btnBuscar.removeAttr('disabled', 'disabled')
        campoUsuarios.removeAttr('disabled', 'disabled')
        textoUsuarios.removeAttr('disabled', 'disabled')
        todosUsuarios.removeAttr('disabled', 'disabled')
        todosUsuarios.prop('checked', false);
        resultadoUsuarios.html('')
        textoUsuarios.val('')

        // breadcumbs

        $('#usuarios-atual').html('Criar')
    })




    // Evento de clique no botão todos
    $('#todos_usuarios').click((e) => {
        const campoUsuarios = $('#campo_usuario')
        const textoUsuarios = $('#texto_usuario')
        const btnBuscar = $('#btn-buscar')
        const todosUsuarios = $('#todos_usuarios')
        if (todosUsuarios.is(':checked')) {
            // Bloqueios
            campoUsuarios.attr('disabled', 'disabled')
            textoUsuarios.attr('disabled', 'disabled')
            textoUsuarios.removeAttr('required', 'required')
        } else {
            // Desbloqueio
            campoUsuarios.removeAttr('disabled', 'disabled')
            textoUsuarios.removeAttr('disabled', 'disabled')
            textoUsuarios.attr('required', 'required')
            textoUsuarios.val('')
        }
    }); // Final do evento

    // Evento do formulario de busca

    $('#busca_usuario_form').on('submit', (e) => {

        const token = localStorage['token']

        e.preventDefault();

        // Loader
        $('#loader').show()

        // Variaveis
        const campoUsuarios = $('#campo_usuario')
        const textoUsuarios = $('#texto_usuario')
        const btnBuscar = $('#btn-buscar')
        const todosUsuarios = $('#todos_usuarios')
        const resultadoUsuarios = $('#resultado_usuarios')

        // // Bloqueios
        btnBuscar.attr('disabled', 'disabled')
        campoUsuarios.attr('disabled', 'disabled')
        textoUsuarios.attr('disabled', 'disabled')
        todosUsuarios.attr('disabled', 'disabled')



        if (todosUsuarios.is(':checked')) {
            Usuarios((a) => {
                // console.log(a)

                // Loader
                $('#loader').hide()

                // Reset
                btnBuscar.removeAttr('disabled', 'disabled')
                campoUsuarios.removeAttr('disabled', 'disabled')
                textoUsuarios.removeAttr('disabled', 'disabled')
                todosUsuarios.removeAttr('disabled', 'disabled')
                todosUsuarios.prop('checked', false);
                resultadoUsuarios.html('')
                textoUsuarios.val('')

                if (a.status == 'success') {
                    const data = a.data
                    const total = a.total
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#resultado_usuarios").offset().top
                    }, 300);
                    if (total == 0) {
                        resultadoUsuarios.html(`
                            <h3 class='h6 text-muted mt-5'>Nenhum usuário encontrado.</h3>
                        `)
                    } else {
                        resultadoUsuarios.html(`
                          
                            <p class=""><strong>Resultado:</strong> ${total}</p>
                            <table class="table table-hover d-none d-md-table" id="tabela_usuarios">
                                <thead class="table-dark">
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Usuário</th>
                                        <th scope="col">Cargo</th>
                                        <th scope="col">Matricula</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>

                            <!-- Mobile -->
                            <div id="usuarios_mobile">
                            </div>
                            `)
                        // Reset div
                        $('#usuarios_mobile').html('')

                        // Construção da tabela
                        data.forEach(usuario => {

                            let newRow = $("<tr>");
                            let cols = "";
                            ativo = usuario['ativo'] == 1 ? '<span class="text-success"><i class="fas fa-check"></i></span>' : '<span class="text-danger"><i class="fas fa-times"></i></span>'
                            cols += `<td scope="row">${titleCase(usuario['nome'])}</td>`
                            cols += `<td>${usuario['nome_usuario']}</td>`
                            cols += `<td>${usuario['cargo']}</td>`
                            cols += `<td>${usuario['matricula']}</td>`
                            cols += `<td>${usuario['email']}</td>`
                            cols += `<td>${ativo}</td>`
                            cols += `<td>
                                            <div class='d-none' id='usuario-${usuario['id']}'>${JSON.stringify(usuario)}</div>
                                            <a class='btn btn-of-transparent' href='#' name='usuario-${usuario['id']}' onclick='verUsuario(this)'>
                                                <i class="far fa-eye"></i>
                                            </a>
                                        </td>`

                            newRow.append(cols);
                            $('#tabela_usuarios').append(newRow);

                            // Mobile
                            $('#usuarios_mobile').append(`
                                <div class="card d-block d-md-none w-100 card-of mb-2" style="">
                                <div class="card-body">
                                    <p class="card-subtitle mb-2 text-muted">
                                        <p class='p-0 m-0'>${usuario['nome']}</p>
                                        <p class='p-0 m-0 small'><strong>Usuário: </strong>${usuario['nome_usuario']}</p>
                                        <p class='p-0 m-0 small'><strong>Cargo:</strong> ${usuario['cargo']}</p>
                                        <p class='p-0 m-0 small'><strong>Matricula:</strong> ${usuario['matricula']}</p>
                                        <p class='p-0 m-0 small'><strong>E-mail:</strong> ${usuario['email']}</p>
                                        <p class='p-0 m-0 small'><strong>Ativo?:</strong> ${ativo}</p>
                                    </p>
                                    <div class='d-none' id='usuario-${usuario['id']}'>${JSON.stringify(usuario)}</div>
                                            <a class='btn btn-of-transparent' href='#' name='usuario-${usuario['id']}' onclick='verUsuario(this)' style="position: absolute; top:0; right: 0;">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                </div>
                            </div>
                                `)

                        });
                    }
                } else {
                    const data = a

                }

            }, token)

        } else {
            Usuario((a) => {
                // console.log(a)

                // Loader
                $('#loader').hide()

                // Reset
                btnBuscar.removeAttr('disabled', 'disabled')
                campoUsuarios.removeAttr('disabled', 'disabled')
                textoUsuarios.removeAttr('disabled', 'disabled')
                todosUsuarios.removeAttr('disabled', 'disabled')
                todosUsuarios.prop('checked', false);
                resultadoUsuarios.html('')
                textoUsuarios.val('')

                if (a.status == 'success') {
                    const data = a.data
                    const total = a.total
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#resultado_usuarios").offset().top
                    }, 300);
                    if (total == 0) {
                        resultadoUsuarios.html(`
                            <h3 class='h6 text-muted mt-5'>Nenhum usuário encontrado.</h3>
                        `)
                    } else {
                        resultadoUsuarios.html(`
                          
                            <p class=""><strong>Resultado:</strong> ${total}</p>
                            <table class="table table-hover d-none d-md-table" id="tabela_usuarios">
                                <thead class="table-dark">
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Usuário</th>
                                        <th scope="col">Cargo</th>
                                        <th scope="col">Matricula</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>

                            <!-- Mobile -->
                            <div id="usuarios_mobile">
                            </div>
                            `)
                        // Reset div
                        $('#usuarios_mobile').html('')

                        // Construção da tabela
                        data.forEach(usuario => {


                            let newRow = $("<tr>");
                            let cols = "";
                            ativo = usuario['ativo'] == 1 ? '<span class="text-success"><i class="fas fa-check"></i></span>' : '<span class="text-danger"><i class="fas fa-times"></i></span>'
                            cols += `<td scope="row">${titleCase(usuario['nome'])}</td>`
                            cols += `<td>${usuario['nome_usuario']}</td>`
                            cols += `<td>${usuario['cargo']}</td>`
                            cols += `<td>${usuario['matricula']}</td>`
                            cols += `<td>${usuario['email']}</td>`
                            cols += `<td>${ativo}</td>`
                            cols += `<td>
                                            <div class='d-none' id='usuario-${usuario['id']}'>${JSON.stringify(usuario)}</div>
                                            <a class='btn btn-of-transparent' href='#' name='usuario-${usuario['id']}' onclick='verUsuario(this)'>
                                                <i class="far fa-eye"></i>
                                            </a>
                                        </td>`

                            newRow.append(cols);
                            $('#tabela_usuarios').append(newRow);

                            // Mobile
                            $('#usuarios_mobile').append(`
                                <div class="card d-block d-md-none w-100 card-of mb-2" style="">
                                <div class="card-body">
                                    <p class="card-subtitle mb-2 text-muted">
                                        <p class='p-0 m-0'>${usuario['nome']}</p>
                                        <p class='p-0 m-0 small'><strong>Usuário: </strong>${usuario['nome_usuario']}</p>
                                        <p class='p-0 m-0 small'><strong>Cargo:</strong> ${usuario['cargo']}</p>
                                        <p class='p-0 m-0 small'><strong>Matricula:</strong> ${usuario['matricula']}</p>
                                        <p class='p-0 m-0 small'><strong>E-mail:</strong> ${usuario['email']}</p>
                                        <p class='p-0 m-0 small'><strong>Ativo?:</strong> ${ativo}</p>
                                    </p>
                                    <div class='d-none' id='usuario-${usuario['id']}'>${JSON.stringify(usuario)}</div>
                                            <a class='btn btn-of-transparent' href='#' name='usuario-${usuario['id']}' onclick='verUsuario(this)' style="position: absolute; top:0; right: 0;">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                </div>
                            </div>
                                `)

                        });
                    }

                } else {
                    const data = a

                }

            }, token, campoUsuarios.val(), textoUsuarios.val())
        }


    });// Final do evento




});

function getPassword() {
    var chars = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "abcdefghijklmnopqrstuvwxyz", '!@#$%^&*()-_'];
    var randPwd = [3, 3, 2, 2].map(function (len, i) { return Array(len).fill(chars[i]).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('') }).concat().join('').split('').sort(function () { return 0.5 - Math.random() }).join('')
    return randPwd
}


const gerar_password = () => {
    const novo_usuario_password = $('#novo_usuario_password')
    novo_usuario_password.val(getPassword())
}
gerar_password()

const gerar_matricula = () => {
    const now = new Date();
    const mes = ("0" + (now.getMonth() + 1)).slice(-2)
    const ano = now.getFullYear().toString().substr(-2)
    var chars = ["abcdefghijklmnopqrstuvwxyz", "0123456789"];
    var randPwd = [1, 3].map(function (len, i) { return Array(len).fill(chars[i]).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('') }).concat().join('').split('').sort(function () { return 0.5 - Math.random() }).join('')
    $('#novo_usuario_matricula').val(randPwd + mes + ano)


}

gerar_matricula()


const carrega_campos_novo_usuario = () => {

    $('#novo_usuario_form').trigger("reset");
    $('#novo_usuario_form').find('button[type=submit]').removeAttr('disabled', 'disabled')
    $('#alert_novo_usuario_nome_usuario').hide()
    $('#alert_novo_usuario_nome_usuario').html('')

    gerar_password()
    gerar_matricula()

};


// Funções Gerais Externas

$(document).on('keyup', '#novo_usuario_nome_usuario', (e) => {
    $('#novo_usuario_nome_usuario').val($('#novo_usuario_nome_usuario').val().replace(/ /g, "_").toLowerCase())
})



// Função de request Externo

const verifica_usuario_exisente = (callback, token, dados) => {
    $.ajax({
        type: 'get',
        url: `/api/v1/admin/user/check_username?user_name=${dados}`,
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

const gravaAcessosUsuarios = (callback, token, dados) => {
    $.ajax({
        type: 'post',
        url: `/api/v1/admin/usuarios/acessos`,
        myCallback: callback,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        contentType: "application/json",
        data: JSON.stringify(dados),
        success: function (data) {
            this.myCallback(data);
        },
        error: function (data, status) {
            this.myCallback(data['responseJSON']);
        }
    });
}

const updateUsuario = (callback, token, dados) => {
    $.ajax({
        type: 'put',
        url: `/api/v1/admin/user`,
        myCallback: callback,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        contentType: "application/json",
        data: JSON.stringify(dados),
        success: function (data) {
            this.myCallback(data);
        },
        error: function (data, status) {
            this.myCallback(data['responseJSON']);
        }
    });
}

const reqNovoUsuario = (callback, token, dados) => {
    $.ajax({
        type: 'post',
        url: `/api/v1/admin/user`,
        myCallback: callback,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        contentType: "application/json",
        data: JSON.stringify(dados),
        success: function (data) {
            this.myCallback(data);
        },
        error: function (data, status) {
            this.myCallback(data['responseJSON']);
        }
    });
}



$(document).on('click', '#btnAdd',
    function (e) {
        let adm = false
        if ($($('#list1 > option:selected')).val() == 1) {
            $('#list2 > option').appendTo('#list1');

            $('#list1 > option').each((i, option) => {

                const item = $(option).val();
                if (item == 1) {
                    $(option).appendTo('#list2');
                }

            })
        } else {

            $('#list2 > option').each((i, option) => {

                const item = $(option).val();
                if (item == 1) {
                    adm = true
                }

            })


            if (!adm) {


                $('#list1 > option:selected').appendTo('#list2');

            } else {
                // Toast
                toast('show', '<i class="fas fa-exclamation-triangle me-2"></i>Erro ao adicionar acesso!', `
               <div class="text-danger text-center">
                   Um acesso administrador ja está adicionado.<br>Não é possivel adicionar outro acesso!
               </div>
               `)
            }


        }



        //  $('#list1 > option:selected').each((i,option)=>{
        //     const item = $(option).val();
        //     if(item == 1){

        //     }
        //  })

        e.preventDefault();
    });

$(document).on('click', '#btnAddAll',
    function (e) {
        $('#list1 > option').appendTo('#list2');
        e.preventDefault();
    });

$(document).on('click', '#btnRemove',
    function (e) {
        $('#list2 > option:selected').appendTo('#list1');
        e.preventDefault();
    });

$(document).on('click', '#btnRemoveAll',
    function (e) {
        $('#list2 > option').appendTo('#list1');
        e.preventDefault();
    });
// Responsivo
if ($(window).width() <= 768) {
    $("#avatar-img img").removeClass('avatar-img-md')
    $('#avatar-img img').addClass('avatar-img-sm')
}

// Funções gerais

const verUsuario = (e) => {
    const id = e.name
    const usuario = JSON.parse($(`#${id}`).html())
    // console.log(usuario)
    const titulo = $('#modal-principal .modal-title')
    const conteudo = $('#modal-principal .modal-body')
    const footer = $('#modal-principal .modal-footer')
    const buttons = $('#modal-principal .modal-buttons')
    // Reset
    titulo.html('')
    conteudo.html('')
    footer.html('')
    buttons.html('')
    // modal buttons
    buttons.append(`<button type="button" class="btn btn-of-primary me-auto"><i class="fas fa-address-book me-2"></i>Contatos</button>`)
    buttons.append(`<hr>`)
    // footer padrão
    footer.append(`<button type="button" class="btn btn-of-primary" data-bs-dismiss="modal"><i class="far fa-times-circle me-2"></i>Fechar</button>`)

    const ativo = usuario['ativo'] == 1 ? `<span class="badge bg-success text-white">
        <i class="fas fa-check me-2"></i>Ativo
      </span>` : `<span class="badge bg-danger text-white">
      <i class="fas fa-check me-2"></i>Inativo
    </span>`

    //Titulo
    titulo.html(`<i class="fas fa-user me-2"></i> ${titleCase(usuario['nome'])}`)
    // DATA
    const dataCriadoem = new Date(usuario['criado_em']);
    const criadoEm = ((dataCriadoem.getDate())) + "/" + ((dataCriadoem.getMonth() + 1)) + "/" + dataCriadoem.getFullYear();
    let dataUpdate = usuario['atualizado_em']
    if (dataUpdate != null) {
        const dataUpdate2 = new Date(dataUpdate);
        dataUpdate = ((dataUpdate2.getDate())) + "/" + ((dataUpdate2.getMonth() + 1)) + "/" + dataUpdate2.getFullYear();
    } else {
        dataUpdate = '-'
    }
    conteudo.html(`
    <div class="row">
    <div class="col-md-4">

        <figure class="figure w-100 text-center" id="avatar-img">
            <img src="${usuario['avatar']}?v=${getRandomIntInclusive(1, 1000)}"
                class="figure-img avatar-img-md shadown-sm" alt="" style="width:416px; max-height:416px;">
        </figure>
        <div class=" d-flex">
            <div class="w-100 ms-1">
                <button class="btn btn-of-primary  btn-sm w-100" data-bs-target="#modal-acessos" data-bs-toggle="modal"
                    data-bs-dismiss="modal" name="acessos_usuario-${usuario['id']}" onclick="verAcessosUsuario(this)"><i
                        class="fas fa-shield-alt me-2" aria-hidden="true"></i>Acessos</button>
            </div>
            <div class="w-100 ms-1">
                <button class="btn btn-of-primary  btn-sm w-100" data-bs-target="#modal-editar-dados-usuario"
                    data-bs-toggle="modal" data-bs-dismiss="modal" name="acessos_usuario-${usuario['id']}"
                    onclick="editarAcessos(this)"><i class="fas fa-edit me-2" aria-hidden="true"></i>Editar</button>
            </div>
            <div class="w-100 ms-1">
                <button class="btn btn-of-primary  btn-sm w-100" data-bs-target="#modal-editar-dados-usuario"
                    data-bs-toggle="modal" data-bs-dismiss="modal" name="senha_usuario-${usuario['id']}"
                    onclick="novo_password_usuario(this)"><i class="fas fa-key me-2" aria-hidden="true"></i>Senha</button>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <ul class="list-group  list-group-flush">
            <span id="id_usuario" class="d-none">${usuario['id']}</span>
            <span id="acessos_usuario-${usuario['id']}" class="d-none">${JSON.stringify(usuario['acessos'])}</span>
            <li class="list-group-item"><strong>Usuário:</strong> ${usuario['nome_usuario']}</li>
            <li class="list-group-item"><strong>Cargo:</strong> ${usuario['cargo']}</li>
            <li class="list-group-item"><strong>Matricula:</strong> ${usuario['matricula']}</li>
            <li class="list-group-item"><strong>E-mail:</strong> ${usuario['email']}</li>
            <li class="list-group-item"><strong>Criado em:</strong> ${criadoEm}</li>
            <li class="list-group-item"><strong>Atualizado em:</strong> ${dataUpdate}</li>
            <li class="list-group-item"><strong>Status:</strong> ${ativo} </li>
        </ul>
        <div class="form-floating mt-2">
            <textarea class="form-control bg-white" placeholder="Leave a comment here" id="floatingTextarea"
                style="min-height: 118px;" readonly>${usuario['observacao']}</textarea>
            <label for="floatingTextarea">Observação:</label>
        </div>
    </div>
</div>
      `)
    //   Responsivo
    if ($(window).width() <= 768) {
        $("#avatar-img img").removeClass('avatar-img-md')
        $('#avatar-img img').addClass('avatar-img-sm')
    }
    $('#modal-principal').modal('show')
}; // final do evento

const editarAcessos = (e) => {
    const acessoUsuariosJSON = JSON.parse($(`#${e.name}`).html())
    const userId = e.name.replace('acessos_usuario-', '')
    const userDataJSON = JSON.parse($(`#usuario-${userId}`).html())
    // console.log(usuario)
    const titulo = $('#modal-editar-dados-usuario .modal-title')
    const conteudo = $('#modal-editar-dados-usuario .modal-body')
    const footer = $('#modal-editar-dados-usuario .modal-footer')
    const buttons = $('#modal-editar-dados-usuario .modal-buttons')

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
                    <div class="col form-floating">
                        <input type="text" class="form-control" id="nome_usuario_form" placeholder="Nome" value="${userDataJSON['nome']}" required>
                                        <label for="nome_usuario_form" class='ms-2'>Nome</label>
                    </div>
                    <div class="col form-floating">
                    <input type="text" class="form-control" id="email_usuario_form" placeholder="E-mail" value="${userDataJSON['email']}" required>
                                    <label for="email_usuario_form" class='ms-2'>E-mail</label>
                </div>
                
                </div>
                <div class='row mt-2'>
                <div class="col form-floating">
                    <input type="text" class="form-control" id="user_name_usuario_form" placeholder="Usuário" value="${userDataJSON['nome_usuario']}" required>
                                    <label for="user_name_usuario_form" class='ms-2'>Usuário</label>
                </div>
                <div class="col form-floating">
                    <input type="text" class="form-control  bg-white" id="matricula_usuario_form" placeholder="Matrícula" value="${userDataJSON['matricula']}" readonly>
                                    <label for="matricula_usuario_form" class='ms-2'>Matrícula</label>
                </div>
                <div class="col form-floating">
                    <input type="text" class="form-control" id="cargo_usuario_form" placeholder="Cargo" value="${userDataJSON['cargo']}" required>
                                    <label for="cargo_usuario_form" class='ms-2' >Cargo</label>
                </div>
                </div>
                <div class='row mt-2'>
                <div class="col form-floating">
                    <input type="text" readonly class="form-control  bg-white" id="criado_em_usuario_form" placeholder="Criado em" value="${criadoEm}">
                                    <label for="criado_em_usuario_form" class='ms-2'>Criado em</label>
                </div>
                <div class="col form-floating">
                    <input type="text" readonly class="form-control bg-white" id="Atualizdo em" placeholder="Matrícula" value="${dataUpdate}">
                                    <label for="atualizado_em_usuario_form" class='ms-2' >Atualizdo em</label>
                </div>

                    <div class='col'>
                    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="usuario_ativo_form" />
        <label class="form-check-label" for="usuario_ativo_form">Usuário ativo</label>
      </div>
                    </div>
                </div>
                
                <div class='row mt-2'>
                    <div class='col form-floating'>
                        <textarea class="form-control" placeholder="Observação" id="observacao_usuario_form" style='min-height: 120px;'>${userDataJSON['observacao']}</textarea>
                        <label for="observacao_usuario_form" class='ms-2'>Observação</label>
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

const novo_password_usuario = (e) => {
    const id = e.name.replace('senha_usuario-', '')
    const dadosUusuario = JSON.parse($(`#usuario-${id}`).html())
    const nome_usuario = dadosUusuario.nome_usuario

    // Variaveis Modal

    const titulo = $('#modal-editar-dados-usuario .modal-title')
    const conteudo = $('#modal-editar-dados-usuario .modal-body')
    const footer = $('#modal-editar-dados-usuario .modal-footer')
    const buttons = $('#modal-editar-dados-usuario .modal-buttons')

    // Reset
    titulo.html('')
    conteudo.html('')

    // Titulo
    titulo.html('<i class="fas fa-unlock-alt me-2"></i>Reset de senha usuário ' + nome_usuario)

    // corpo
    conteudo.html(`
    
    <div class="p-2 mt-2 ">
    <div class='mt-2 bg-light p-3'>
        <h5 class='h5'>Instruções</h5>
        <p class='fs-6'>Será gerado uma nova senha aleatória dentro dos padrões do sistema para o usuário.</p>
        <p class='fs-6'>Anote a senha e passe ao usuário apos a confirmação de alteração.</p>
    </div>
    <form id="reset_senha_usuario_form" class='mt-3 mb-2'>
        <h4 class='mb-3'>Nova senha</h4>
        <div class="col-md-12 form-floating mb-3">
            <input type="text" class="form-control form-of bg-white"
                id="senha_reset_senha_usuario"
                placeholder="Password gerado automaticamente." disabled required>
            <label for="senha_reset_senha_usuario">Password</label>
            <small class="text-small small text-danger">Não esqueça de anotar o password!</small>
        </div>
        <div class="row g-2 mt-2">
            <button type="submit" onclick="carregamento(this)" class="btn btn-of-primary">
                <i class="fas fa-save me-2"></i>Gravar
            </button>
        </div>
    </form>
        
    </div>
    
    `)
    $('#senha_reset_senha_usuario').val(getPassword())


};

const verAcessosUsuario = (e) => {
    const acessoUsuariosJSON = JSON.parse($(`#${e.name}`).html())
    const userId = e.name.replace('acessos_usuario-', '')
    const userDataJSON = JSON.parse($(`#usuario-${userId}`).html())
    // console.log(userDataJSON)
    const titulo = $('#modal-acessos .modal-title')
    const conteudo = $('#modal-acessos .modal-body')
    const footer = $('#modal-acessos .modal-footer')
    const buttons = $('#modal-acessos .modal-buttons')
    // Reset
    titulo.html('')
    conteudo.html('')

    titulo.html(`<i class="fas fa-user-shield me-2"></i><strong>Acessos:</strong> ${userDataJSON.nome_usuario}`)
        /
        conteudo.html(`
        <div id='box-usuarios-acessos'>
        <form action="" id="setaAcessoUsuario" name=${userId}>
<div class="d-flex">
<div class="form-group w-50">
<label for="" class="h6 text-muted">Acessos do Sistema</label>
<select class="form-control" name="" id="list1" style="min-width:100%; height: 85%;">
</select>
</div>
<div class="form-group text-center mt-4">
<div class="form-control  border-0">
     <button class="btn  btn-of-primary w-100" id="btnAdd">
     <i class="fas fa-angle-right"></i>
     </button>
  </div>
  <div class="form-control  border-0">
   <button class="btn  btn-of-primary w-100" id="btnRemove">
   <i class="fas fa-angle-left"></i>
   </button>
   </div>
   <div class="form-control border-0">
   <button class="btn btn-of-primary w-100" id="btnRemoveAll">
   <i class="fas fa-angle-double-left"></i>
   </button>
   </div>
   <div class="form-control border-0">
   <button type="submit" onclick="carregamento(this)" class="btn btn-of-primary  w-100"><i class="far fa-save"></i></button>
   </div>
</div>
<div class="form-group w-50">
<label for="" class="h6 text-muted" >Acessos do usuários</label>
<select class="form-control" name="" id="list2" size="3" style="min-width:250px; height: 85%;">
 
</select>
</div>
</div>
</form>
        </div>
    `)

    if ($(window).width() <= 768) {
        $('#box-usuarios-acessos').html(`
        <form action="" id="setaAcessoUsuario" name=${userId}>
<div class="">
<div class="form-group">
<label for="" class="h6 text-muted">Acessos do Sistema</label>
<select class="form-select" multiple data-native-menu="false" name="" id="list1" style="min-width:250px">
</select>
</div>
<div class="form-group d-flex mt-2 mb-2">
<div class="form-control border-0 w-100">
     <button class="btn btn-sm btn-of-primary w-100" id="btnAdd">
     <i class="fas fa-chevron-down"></i>
     </button>
  </div>
  <div class="form-control border-0 w-100">
   <button class="btn btn-sm btn-of-primary w-100" id="btnRemove">
   <i class="fas fa-chevron-up"></i>
   </button>
   </div>
   <div class="form-control border-0 w-100">
   <button class="btn btn-sm btn-of-primary w-100" id="btnRemoveAll">
   <i class="fas fa-angle-double-up"></i>
   </button>
   </div>
</div>
<div class="form-group">
<label for="" class="h6 text-muted" >Acessos do usuários</label>
<select class="form-control" name="" id="list2" size="3" style="min-width:250px">
 
</select>
</div>
</div>
  <div class="mt-2 mr-auto text-end">
     <button type="submit" onclick="carregamento(this)" class="btn btn-of-primary btn-sm"><i class="far fa-save me-2"></i>Salvar</button>
  </div>
</form>
        `)
    }



    var settings = {
        "url": "/api/v1/admin/acessos",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": `Bearer ${localStorage['token']}`
        },
    };

    $.ajax(settings).done(function (response) {
        $('#list1').attr('size', response.data.length)
        $('#list2').attr('size', response.data.length)
        response.data.forEach(elemento => {
            $('#list1').append(`
            <option value="${elemento.id}">${elemento.nome}</option>
            `)
        })
        acessoUsuariosJSON.forEach(element => {
            $('#list1 > option').each(function (e, option) {
                if ($(option).val() == element.acesso_id) {
                    $(option).appendTo('#list2')
                }
            })
        });

    });



}; //Final do evento

// Evento de novo usuario #novoUsuario
$(document).on('change', '#novo_usuario_nome_usuario', (e)=>{
    const token = localStorage['token']
    verifica_usuario_exisente((a) => {
        // console.log(a)
        if (a.status == 'success') {
            const data = a.data
            if(a.user){
                // console.log('existe')
                $('#novo_usuario_form').find('button[type=submit]').attr('disabled', 'disabled')
                $('#alert_novo_usuario_nome_usuario').html('Usuário indisponível.')
                $('#alert_novo_usuario_nome_usuario').addClass('text-danger')
                $('#alert_novo_usuario_nome_usuario').removeClass('text-success')
                $('#alert_novo_usuario_nome_usuario').show()

            }else{
                $('#novo_usuario_form').find('button[type=submit]').removeAttr('disabled', 'disabled')
                $('#alert_novo_usuario_nome_usuario').html('Usuário disponível.')
                $('#alert_novo_usuario_nome_usuario').removeClass('text-danger')
                $('#alert_novo_usuario_nome_usuario').addClass('text-success')
                $('#alert_novo_usuario_nome_usuario').show()
            }

        } else {
            const data = a
          
        }

    }, token, $('#novo_usuario_nome_usuario').val().replace(/ /g, "_").toLowerCase())
        
})
$(document).on('submit', '#novo_usuario_form', (e) => {

    e.preventDefault()
    const token = localStorage['token']
    // Variaveis gerar_password

    const novo_usuario_nome = $('#novo_usuario_nome')
    const novo_usuario_nome_usuario = $('#novo_usuario_nome_usuario')
    const novo_usuario_email = $('#novo_usuario_email')
    const novo_usuario_cargo = $('#novo_usuario_cargo')
    const novo_usuario_password = $('#novo_usuario_password')
    const novo_usuario_observacao = $('#novo_usuario_observacao')
    const novo_usuario_matricula = $('#novo_usuario_matricula')
    let observacao = novo_usuario_observacao.val()
    if (novo_usuario_observacao.val() == '' || novo_usuario_observacao.val() == null) {
        observacao = 'Nenhuma observação'
    }

    //

    $('#novo_usuario_form').find('button[type=submit]').html(`
       <div class="text-center">
           <div class="spinner-border spinner-border-sm" role="status">
               <span class="visually-hidden">Loading...</span>
           </div>
       </div>
       `)
    $('#novo_usuario_form').find('button[type=submit]').attr('disabled', 'disabled')

    const payload = {
        "nome": titleCase(novo_usuario_nome.val()),
        "usuario": novo_usuario_nome_usuario.val().replace(/ /g, "_").toLowerCase(),
        "email": novo_usuario_email.val().toLowerCase(),
        "observacao": observacao,
        "cargo": titleCase(novo_usuario_cargo.val()),
        "matricula": novo_usuario_matricula.val(),
        "password": novo_usuario_password.val()
    }
    reqNovoUsuario((a) => {
        // console.log(a)
        if (a.status == 'success') {
            const data = a.data
            $('#novo_usuario_form').find('button[type=submit]').html(`
            <i class="fas fa-save me-2" aria-hidden="true"></i>Gravar
       `)

            $('#novo_usuario_form').find('button[type=submit]').removeAttr('disabled', 'disabled')
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alerta novo usuário.`, `<div class="alert text-center text-success" role="alert">
                <strong>${data}</strong>
            </div>`)
            let confirm = alert("Por favor anote a senha gerada automaticamente\n" + novo_usuario_password.val())
            setTimeout(() => {
                document.location.href = '/configuracoes';
            }, 5000)

        } else {
            const data = a
            $('#novo_usuario_form').find('button[type=submit]').html(`
            <i class="fas fa-save me-2" aria-hidden="true"></i>Gravar
       `)
            $('#novo_usuario_form').find('button[type=submit]').removeAttr('disabled', 'disabled')
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alerta novo usuário.`, `<div class="alert text-center text-danger" role="alert">
                <strong>${JSON.stringify(data.message)}</strong>
            </div>`)

        }

    }, token, payload)
    // console.log(payload)

});

$(document).on('submit', '#setaAcessoUsuario', (evento) => {

    evento.preventDefault()
    const token = localStorage['token']
    const userDataJSON = JSON.parse($(`#usuario-${$("#setaAcessoUsuario").attr('name')}`).html())
    let acessos = []
    $('#list2 > option').each((i, option) => {
        acessos.push(parseInt($(option).val()))
    });
    const payload = {
        "user_id": parseInt($("#setaAcessoUsuario").attr('name')),
        "acessos": acessos,
    }

    // Start loading
    $('#setaAcessoUsuario').find('button[type=submit]').html(`
       <div class="text-center">
           <div class="spinner-border spinner-border-sm" role="status">
               <span class="visually-hidden">Loading...</span>
           </div>
       </div>
       `)
    $('#setaAcessoUsuario').find('button[type=submit]').attr('disabled', 'disabled')



    gravaAcessosUsuarios((a) => {
        if (a.status == 'success') {
            const data = a.data
            if ($(window).width() <= 768) {
                $('#setaAcessoUsuario').find('button[type=submit]').html(`
                <i class="far fa-save"></i> Salvar
                `)
            } else {
                $('#setaAcessoUsuario').find('button[type=submit]').html(`
            <i class="far fa-save"></i>
            `)
            }
            $('#setaAcessoUsuario').find('button[type=submit]').removeAttr('disabled', 'disabled')
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alerta acesso usuário.`, `<div class="alert text-center text-success" role="alert">
                <strong>${data}</strong>
            </div>`)
            if (userDataJSON['nome_usuario'] == localStorage['usuario']) {
                setTimeout(() => {
                    document.location.href = '/configuracoes';
                }, 5000)
            }
        } else {
            const data = a

        }

    }, token, payload)

});

$(document).on('submit', '#editar-dados-usuario-form', (evento) => {

    evento.preventDefault()

    // Load
    $('#editar-dados-usuario-form').find('button[type=submit]').html(`
     <div class="text-center">
         <div class="spinner-border spinner-border-sm" role="status">
             <span class="visually-hidden">Loading...</span>
         </div>
     </div>
     `)
    $('#editar-dados-usuario-form').find('button[type=submit]').attr('disabled', 'disabled')

    const token = localStorage['token']

    // ID DO USUARIO A SER EDITADO
    const id_usuario = $("#editar-dados-usuario-form").attr('name')

    // VARIAVEIS DO USUARIO NO FORMULARIO

    const $nome = $("#nome_usuario_form")
    const $email = $("#email_usuario_form")
    const $usuario = $("#user_name_usuario_form")
    const $matricula = $("#matricula_usuario_form")
    const $cargo = $("#cargo_usuario_form")
    let $ativo = $('#usuario_ativo_form')
    const $observacao = $("#observacao_usuario_form")

    if ($ativo.is(":checked")) {
        $ativo = 1
    } else {
        $ativo = 0
    }

    const payload = {
        "id": id_usuario,
        "nome": $nome.val(),
        "email": $email.val(),
        "usuario": $usuario.val(),
        "matricula": $matricula.val(),
        "cargo": $cargo.val(),
        "ativo": $ativo,
        "observacao": $observacao.val()
    }
    updateUsuario((a) => {

        if (a.status == 'success') {
            const data = a.data
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alerta edição de usuário.`, `<div class="alert text-center text-success" role="alert">
                <strong>${data}</strong>
            </div>`)
            $('#editar-dados-usuario-form').find('button[type=submit]').html(`
            <i class="fas fa-save me-2"></i>Gravar</button>
     `)
            setTimeout(() => { document.location.href = '/configuracoes'; }, 3000)
        } else {
            // console.log(a)
            const data = a
            toast('show', `<i class="fas fa-exclamation-triangle me-2"></i>Alerta edição de usuário.`, `<div class="alert text-center text-danger" role="alert">
                <strong>${JSON.stringify(a.message).replace('{', '').replace('}', '')}</strong>
            </div>`)
            $('#editar-dados-usuario-form').find('button[type=submit]').html(`
            <i class="fas fa-save me-2"></i>Gravar</button>
     `)
            $('#editar-dados-usuario-form').find('button[type=submit]').removeAttr('disabled', 'disabled')
        }


    }, token, payload)

});
