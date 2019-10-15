var jsonPet_list = null;
var jsonPet_abilities = null;

var selected_slot = null;
var selected_pets = null;

class BeltSlot {
    constructor(stage, data) {
        this.stage = stage;
        this.data = data;
    }
}

class Stat {
    constructor(name, value, percentage, extra, setTimes, stats) {
        this.name = name;
        this.value = value;
        this.percentage = percentage;
        this.extra = extra;
        this.setTimes = setTimes;
        this.stats = stats;
    }
}

var BeltSlot_1 = null; //  = new BeltSlot(_stage, _petData);
var BeltSlot_2 = null;
var BeltSlot_3 = null;
var BeltSlot_4 = null;
var BeltSlot_5 = null;
var BeltSlot_6 = null;
var BeltSlot_7 = null;
var BeltSlot_8 = null;

var STR = new Stat('Srenght', 0, 0, 0, 0, null);
var VIT = new Stat('Vitality', 0, 0, 0, 0, null);
var INT = new Stat('Inteligence', 0, 0, 0, 0, null);
var WIS = new Stat('Wisdom', 0, 0, 0, 0, null);
var AGI = new Stat('Agility', 0, 0, 0, 0, null);
var DEX = new Stat('Dexterity', 0, 0, 0, 0, null);
var WIS = new Stat('Wisdom', 0, 0, 0, 0, null);
var MAXHP = new Stat('Max.HP', 0, 0, 0, 0, null);
var LUCK = new Stat('Luck', 0, 0, 0, 0, null);

var PATK = new Stat('P.Atk', 0, 0, 0, 0, null);
var MATK = new Stat('M.Atk', 0, 0, 0, 0, null);
var PDEF = new Stat('P.Def', 0, 0, 0, 0, null);
var MDEF = new Stat('M.Def', 0, 0, 0, 0, null);
var ATKSPD = new Stat('Atk.Spd', 0, 0, 0, 0, null);
var CASTSPD = new Stat('Cast.Spd', 0, 0, 0, 0, null);
var ACCU = new Stat('Accuracity', 0, 0, 0, 0, null);
var MACC = new Stat('Magic Acc.', 0, 0, 0, 0, null);
var CRIT = new Stat('Crit.Rate', 0, 0, 0, 0, null);
var CRITPOW = new Stat('Crit.Pow', 0, 0, 0, 0, null);
var BLOCK = new Stat('Block Def', 0, 0, 0, 0, null);
var EVA = new Stat('Evasion', 0, 0, 0, 0, null);
var HPREGEN = new Stat('HP.Regen', 0, 0, 0, 0, null);
var MPREGEN = new Stat('MP.Regen', 0, 0, 0, 0, null);

//Esto se usa para leer archivos desde JQuery:
var files;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fs = null;

// https://craftpip.github.io/jquery-confirm

function Iniciar() {
    try {
        //Cargar los Datos de las Abilidades de los Pets:
        $.getJSON('data/pet_card_abilities.json', function (data) {
            jsonPet_abilities = data;
        });

        //Carga los Nombres de los Pets:
        $.getJSON('data/pet_list.json', function (data) {
            jsonPet_list = data;

            if (typeof jsonPet_list !== "undefined" && jsonPet_list !== null) {
                //Carga la Lista de Pets en un Combo:
                var ListVar = $("#cboPetChoose");
                ListVar.empty();
                ListVar.append('<option></option>'); //<- Primera Opcion del Menu Vacia

                jsonPet_list.forEach(function (_pet) {
                    //console.log(_pet);
                    var opt = $("<option>" + _pet.pet_name + "</option>").attr("value", _pet.pet_name);
                    ListVar.append(opt);
                });
                ListVar.selectmenu().selectmenu('refresh', true);
            }
        });
    } catch (e) {
        $.alert({
            title: e.name,
            content: e.message,
            useBootstrap: false
        });
    }

    // Obtiene los Valores Iniciales del Tamaño de la Ventana
    var winWidth = $(window).width();
    var winHeight = $(window).height() - 50;


    /******** AQUI SE ENLAZAN LOS EVENTOS DE LOS CONTROLES ***********/
    $(document).on("click", "#cmdSetPetInBelt", function (evt) {
        var _pet = $('#cboPetChoose').val();
        if (typeof _pet !== "undefined" && _pet !== null && _pet !== '') {

            var _stage = $('#cboPetStage').val();
            console.log(selected_slot);

            //1.Cambiar la Imagen de la Pet Seleccionada:     
            var img_name = 'img/pets/' + _pet + '.jpg'; //console.log(img_name);
            $('#' + selected_slot).attr("src", img_name);

            //2.Obtener los datos de la Pet:
            var _petData = jsonPet_abilities.filter(function (item) {
                return item.pet_name === _pet;
            });
            if (typeof _petData !== "undefined" && _petData !== null) {
                //console.log(_petData);
                switch (selected_slot) {
                    case 'BeltSlot_1':
                        BeltSlot_1 = new BeltSlot(_stage, _petData);
                        //console.log(BeltSlot_1);
                        break;

                    case 'BeltSlot_2':

                        //console.log('x2');
                        BeltSlot_2 = new BeltSlot(_stage, _petData);
                        //console.log(BeltSlot_2);
                        break;

                    case 'BeltSlot_3':
                        BeltSlot_3 = new BeltSlot(_stage, _petData);
                        break;

                    case 'BeltSlot_4':
                        BeltSlot_4 = new BeltSlot(_stage, _petData);
                        break;

                    case 'BeltSlot_5':
                        BeltSlot_5 = new BeltSlot(_stage, _petData);
                        break;

                    case 'BeltSlot_6':
                        BeltSlot_6 = new BeltSlot(_stage, _petData);
                        break;

                    case 'BeltSlot_7':
                        BeltSlot_7 = new BeltSlot(_stage, _petData);
                        break;

                    case 'BeltSlot_8':
                        BeltSlot_8 = new BeltSlot(_stage, _petData);
                        break;

                    default:
                        // code block
                }

                CalcularBeltStats();

                //Texto Sobre la Imagen del Pet:
                var _petBonus = '<p style="font-size:8px">' + _pet + '<br>Stage: ' + _stage;

                //3.Establecer las Abilidades que ofrece el Pet:               
                _petData.forEach(function (_petInfo) {
                    //console.log(_petInfo);

                    var new_val = parseFloat(_petInfo['s' + _stage]);
                    _petBonus += '<br>' + _petInfo.ability + ': ' + new_val + '%';
                    $('#' + selected_slot + 'b').html(_petBonus + '</p>');
                });
            }
            //$('#' + selected_slot + 'a').focus();

        }
        hidePopUp();
    });

    $(document).on("click", "#BeltSlot_1", function (evt) {
        //selected_slot = $('#BeltSlot_1');
        console.log('BeltSlot_1');
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



function CalcularBeltStats() {
    //console.log('Calculando..');
    try {
        console.log(BeltSlot_1);
        console.log(BeltSlot_2);
        console.log(BeltSlot_3);


        if (typeof BeltSlot_1 !== "undefined" && BeltSlot_1 !== null) {
            console.log('1');
            ProcesarPet(BeltSlot_1);

            /*BeltSlot_1.data.forEach(function (_petInfo) {
                /*  +1% x cada pet que aporte la misma stat
                 *  Max % = 33%
                 *  30% + 1% x Pet
                */

            /* var _Stat = window[_petInfo.ability];
                _Stat.setTimes++;  
                
                console.log(_Stat);
                
                var old_val = parseFloat(_Stat.percentage);                    
                var new_val = parseFloat(_petInfo['s' + BeltSlot_1.stage]);
                var times = 0;
                var _extra = 0;
                
                _Stat.extra += new_val; 
                
                if (_Stat.setTimes > 1) {
                    times = _Stat.setTimes;
                } else {
                    times = 0;
                };
                
                if((old_val + new_val + times) > 30){
                    _Stat.percentage = 30 + times;     
                    _extra = _Stat.extra - _Stat.percentage;
                } else {
                    _Stat.percentage = old_val + new_val + times;
                    _extra = 0;
                };
                
                //"&nbsp;<spam style='color:red'>(0% Extra)</spam>&nbsp;<spam style='color:greenyellow'>+0</spam>"
                var set_html = _Stat.percentage + '%'; 
                
                if(_extra > 0) {
                    set_html +=  "&nbsp;<spam style='color:red'>(" + _extra + '% Extra)</spam>';
                };
                if (_Stat.value > 0) {
                    set_html += "&nbsp;<spam style='color:greenyellow'>+" + _Stat.value + "</spam>";
                };
                
                //Mostar el bonus para la Stat en su Control correspondiente:
                $('#text-' + _petInfo.ability).html(set_html);                
            }); */
        };
        if (typeof BeltSlot_2 !== "undefined" && BeltSlot_2 !== null) {
            console.log('2');
        };
        if (typeof BeltSlot_3 !== "undefined" && BeltSlot_3 !== null) {
            console.log('3');
        };
        if (typeof BeltSlot_4 !== "undefined" && BeltSlot_4 !== null) {

        };
        if (typeof BeltSlot_5 !== "undefined" && BeltSlot_5 !== null) {

        };
        if (typeof BeltSlot_6 !== "undefined" && BeltSlot_6 !== null) {

        };
        if (typeof BeltSlot_7 !== "undefined" && BeltSlot_7 !== null) {

        };
        if (typeof BeltSlot_8 !== "undefined" && BeltSlot_8 !== null) {

        };

    } catch (e) {
        console.log(e);
    }
}

function ProcesarPet(pDatos) {
    if (typeof pDatos !== "undefined" && pDatos !== null) {

        pDatos.data.forEach(function (_petData) {
            /*  +1% x cada pet que aporte la misma stat
             *  Max % = 33%
             *  30% + 1% x Pet
             */
            var _Stat = new Stat('Srenght', 0, 0, 0, 0, null);
            
            var _Stat = window[_petData.ability];
            if (typeof _Stat !== "undefined" && _Stat !== null) {
                _Stat.setTimes++;

                console.log(_Stat);

                var old_val = parseFloat(_Stat.percentage);
                var new_val = parseFloat(_petData['s' + pDatos.stage]);
                var times = 0;
                var _extra = 0;

                _Stat.extra += new_val;

                if (_Stat.setTimes > 1) {
                    times = _Stat.setTimes;
                } else {
                    times = 0;
                };

                if ((old_val + new_val + times) > 30) {
                    _Stat.percentage = 30 + times;
                    _extra = _Stat.extra - _Stat.percentage;
                } else {
                    _Stat.percentage = old_val + new_val + times;
                    _extra = 0;
                };

                //"&nbsp;<spam style='color:red'>(0% Extra)</spam>&nbsp;<spam style='color:greenyellow'>+0</spam>"
                var set_html = _Stat.percentage + '%';

                if (_extra > 0) {
                    set_html += "&nbsp;<spam style='color:red'>(" + _extra + '% Extra)</spam>';
                };
                if (_Stat.value > 0) {
                    set_html += "&nbsp;<spam style='color:greenyellow'>+" + _Stat.value + "</spam>";
                };

                //Mostar el bonus para la Stat en su Control correspondiente:
                $('#text-' + _petData.ability).html(set_html);
            };
        });
    };
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

function ShowLoading(pText) {
    var interval = setInterval(function () {
        $.mobile.loading("show", {
            textonly: "true",
            text: pText,
            textVisible: true,
            theme: "a",
            html: ""
        });
        clearInterval(interval);
    }, 1);
}

function HideLoading() {
    var interval = setInterval(function () {
        $.mobile.loading('hide');
        clearInterval(interval);
    }, 1);
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
