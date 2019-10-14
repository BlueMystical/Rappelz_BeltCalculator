var jsonPet_list = null;
var jsonPet_abilities = null;
var selected_slot = null;
var selected_pets = null;

//Esto se usa para leer archivos desde JQuery:
var files;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fs = null;

// https://craftpip.github.io/jquery-confirm

function Iniciar() {
    try {
        //Cargar los Datos de las Abilidades de los Pets:
        $.getJSON('data/pet_card_abilities.json', function (data) {
            jsonPet_abilities = data; console.log(jsonPet_abilities);	     
        });
        
        //Carga los Nombres de los Pets:
        $.getJSON('data/pet_list.json', function (data) {
            jsonPet_list = data; //console.log(jsonPet_list);	  
            
            if(typeof jsonPet_list !== "undefined" && jsonPet_list !== null){
                var ListVar = $("#cboPetChoose");
                ListVar.empty();
                ListVar.append('<option></option>');
                
                jsonPet_list.forEach(function(_pet) {
                   //console.log(_pet);
                    var opt = $("<option>" + _pet.pet_name + "</option>").attr("value", _pet.pet_name);
                   ListVar.append(opt);
                });
                ListVar.selectmenu('refresh');
            }
        });
        
          //Muestra el Captcha de Google (Requiere una Clave):            
           /* grecaptcha.render('Captcha_Container', {
                'sitekey' : '6LftZ5gUAAAAAE3pO6hrm_r5Q1h8DCez6O6QTSfO',
                'callback' : verificarCaptcha,
                'theme' : 'light'
            });*/
            //Cuando el Captcha sea verificado se muestra el Inicio de Sesion, ver 'verificarCaptcha'
    } catch (e) {
        $.alert({ title: e.name, content: e.message, useBootstrap:false });
    }
    
    // Obtiene los Valores Iniciales del Tamaño de la Ventana
	var winWidth = $(window).width();
	var winHeight = $(window).height() - 50;
    

    /******** AQUI SE ENLAZAN LOS EVENTOS DE LOS CONTROLES ***********/
    $(document).on("click", "#cmdSetPetInBelt", function (evt) {
        var _pet = $('#cboPetChoose').val();
        if(typeof _pet !== "undefined" && _pet !== null && _pet !== ''){
            
            var _stage = $('#cboPetStage').val(); 
            console.log(selected_slot);
            
            //1.Cambiar la Imagen de la Pet Seleccionada:     
            var img_name = 'img/pets/' + _pet + '.jpg';  //console.log(img_name);
            $('#' + selected_slot).attr("src", img_name);
                      

            //2.Obtener los datos de la Pet:
            var _petData = jsonPet_abilities.filter(function(item) { return item.pet_name === _pet; });         
            if(typeof _petData !== "undefined" && _petData !== null){
                
                //3.Establecer las Abilidades que ofrece el Pet
                var _petBonus = _pet + '<small><br>Stage: ' + _stage;
                
                _petData.forEach(function (_petInfo) {
                    console.log(_petInfo);
                    
                    var times_set = parseInt($('#text-' + _petInfo.ability).data("times")) + 1;
                    times_set = times_set + 1;
                   // console.log(times_set);
                    
                    //$('#text-' + _petInfo.ability).data("times", times_set);
                    //$('#text-' + _petInfo.ability).attr('data-times', times_set);

                    var old_val = parseFloat($('#text-' + _petInfo.ability).val().replace('%', ''));                    
                    var new_val = parseFloat(_petInfo['s' + _stage]);
                    var set_val = '0';
                    var extra = 0;
                    
                    console.log(_petInfo.ability);
                    _petBonus += '<br>' + _petInfo.ability + ': ' + new_val + '%';
                    
                    if((old_val + new_val + times_set) > 30){
                        extra = (old_val + new_val + times_set) - 30;
                        set_val = 30 + times_set + '% (+' + extra + '%)'; 
                    } else {
                        set_val = old_val + new_val + times_set;
                    }
                    
                    $('#text-' + _petInfo.ability).val(set_val  + '%');
                    $('#' + selected_slot + 'b').html(_petBonus + '</small>');  
                });
            }
            $('#' + selected_slot + 'a').focus();
            
        }
        hidePopUp();
    });

    $(document).on("click", "#BeltSlot_1", function (evt) {
        //selected_slot = $('#BeltSlot_1');
        selected_slot = 'BeltSlot_1';
        showPopUp();
    });
    $(document).on("click", "#BeltSlot_2", function (evt) {
        selected_slot = 'BeltSlot_2';
        showPopUp();
    });
    $(document).on("click", "#BeltSlot_3", function (evt) {
        selected_slot = 'BeltSlot_3';
        showPopUp();
    });
     $(document).on("click", "#BeltSlot_4", function (evt) {
        selected_slot = 'BeltSlot_4';
        showPopUp();
    });
     $(document).on("click", "#BeltSlot_5", function (evt) {
        selected_slot = 'BeltSlot_5';
        showPopUp();
    });
     $(document).on("click", "#BeltSlot_6", function (evt) {
        selected_slot = 'BeltSlot_6';
        showPopUp();
    });
    
     $(document).on("click", "#BeltSlot_7", function (evt) {
           console.log('Click7');
    });
     $(document).on("click", "#BeltSlot_8", function (evt) {
       console.log('Click8');
    });

    $(document).on("click", "#cmdIniciarSesion", function (evt) {
        //Fuerza la recarga de la pagina para cerrar la sesión:
        window.location.reload();
    });


}

function verificarCaptcha() {
    console.log('Respuesta del Captcha:');
    console.log(grecaptcha.getResponse());
    $('#Captcha_Container').fadeOut();
    var timeoutID = window.setTimeout(showPopUp, 1000); //<-Espera 1 segundo y muestra la ventana de Login
}

/******* AQUI VAN OTRAS FUNCIONES COMPLEMENTARIAS ***************/
function showPopUp() {
    $("#myPopup").popup("open", {
        positionTo: 'window',
        transition: "flip"
    });
    $('#cboPetChoose').focus();
}
function hidePopUp() {
    $("#myPopup").popup("close");
    $("#contenido").show();
}

function ShowLoading(pText){
    var interval = setInterval(function(){
        $.mobile.loading("show", { textonly: "true", text: pText, textVisible: true, theme: "a", html: "" });
        clearInterval(interval);
    },1);
}
function HideLoading(){
    var interval = setInterval(function(){
        $.mobile.loading('hide');
        clearInterval(interval);
    },1); 
}

function FindMyPet(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(FindMyPet(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

function supports_html5_storage() {
    //Verifica el soperte del navegador para HTML5 y Local Storage
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
