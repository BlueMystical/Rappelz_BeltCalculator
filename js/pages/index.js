var jsonPet_list = null;
var jsonPet_abilities = null;

var selected_slot = null;
var selected_pets = null;

class BeltSlot {
    constructor(pet_name, stage, stats) {
        this.pet_name = pet_name;
        this.stage = stage;
        this.stats = stats;
    }
}

class Stat {
    constructor(name, value, percentage, extra, setTimes) {
        this.name = name;
        this.value = value;
        this.percentage = percentage;
        this.extra = extra;
        this.setTimes = setTimes;
    }
}

var BeltSlot_1 = null; //  = new BeltSlot(_stage, _petData, _stats);
var BeltSlot_2 = null;
var BeltSlot_3 = null;
var BeltSlot_4 = null;
var BeltSlot_5 = null;
var BeltSlot_6 = null;
var BeltSlot_7 = null;
var BeltSlot_8 = null;


var STR = new Stat('STR', 0, 0, 0, 0);
var VIT = new Stat('VIT', 0, 0, 0, 0);
var INT = new Stat('INT', 0, 0, 0, 0);
var WIS = new Stat('WIS', 0, 0, 0, 0);
var AGI = new Stat('AGI', 0, 0, 0, 0);
var DEX = new Stat('DEX', 0, 0, 0, 0);
var MAXHP = new Stat('MAXHP', 0, 0, 0, 0);
var MAXMP = new Stat('MAXMP', 0, 0, 0, 0);
var LUCK = new Stat('LUCK', 0, 0, 0, 0);

var PATK = new Stat('PATK', 0, 0, 0, 0);
var MATK = new Stat('MATK', 0, 0, 0, 0);
var PDEF = new Stat('PDEF', 0, 0, 0, 0);
var MDEF = new Stat('MDEF', 0, 0, 0, 0);
var ATKSPD = new Stat('ATKSPD', 0, 0, 0, 0);
var CAST = new Stat('CASTSPD', 0, 0, 0, 0);
var ACCU = new Stat('ACCU', 0, 0, 0, 0);
var MACC = new Stat('MACC', 0, 0, 0, 0);
var CRIT = new Stat('CRIT', 0, 0, 0, 0);
var CRITPOW = new Stat('CRITPOW', 0, 0, 0, 0);
var BLOCK = new Stat('BLOCK', 0, 0, 0, 0);
var EVA = new Stat('EVA', 0, 0, 0, 0);
var HPREGEN = new Stat('HPREGEN', 0, 0, 0, 0);
var MPREGEN = new Stat('MPREGEN', 0, 0, 0, 0);
var MRESIST = new Stat('MRESIST', 0, 0, 0, 0);
var WEIGHT = new Stat('WEIGHT', 0, 0, 0, 0);

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
            var _SlotId = selected_slot.substring(selected_slot.length - 1, selected_slot.length);

            //1.Cambiar la Imagen de la Pet Seleccionada:     
            var img_name = 'img/pets/' + _pet + '.jpg';
            $('#' + selected_slot).attr("src", img_name);

            //2.Obtener los datos de la Pet:
            var _petData = jsonPet_abilities.filter(function (item) {
                return item.pet_name === _pet;
            });
            if (typeof _petData !== "undefined" && _petData !== null) {
                //console.log(_petData);
                //Instancio una Variable Global con la Informacion de la Pet grabada en el Slot Seleccionado:
                window[selected_slot] = new BeltSlot(_pet, parseInt(_stage), null);
                window[selected_slot].stats = [];

                //Texto Sobre la Imagen del Pet:
                var _petBonus = '<p style="font-size:8px">' + _pet + '<br>Stage: ' + _stage;

                //3.Establecer las Abilidades que ofrece el Pet:               
                _petData.forEach(function (_petInfo) {
                    //console.log(_petInfo);
                    var stat_value = parseFloat(_petInfo['s' + _stage]);
                    window[selected_slot].stats.push(new Stat(_petInfo.ability, stat_value, 0, 0, 0));

                    //4. Mostrar sobre la imagen del Pet sus Datos:
                    _petBonus += '<br>' + _petInfo.ability + ': ' + stat_value + '%';
                    $('#' + selected_slot + 'b').html(_petBonus + '</p>');
                });

                console.log(window[selected_slot]);
                //5. Re-calcular Todas las Stats
                CalcularBeltStats();
            }
        }
        hidePopUp();
    });

    $(document).on("click", "#BeltSlot_1", function (evt) {
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
    try {

        STR = new Stat('STR', 0, 0, 0, 0);
        VIT = new Stat('VIT', 0, 0, 0, 0);
        INT = new Stat('INT', 0, 0, 0, 0);
        WIS = new Stat('WIS', 0, 0, 0, 0);
        AGI = new Stat('AGI', 0, 0, 0, 0);
        DEX = new Stat('DEX', 0, 0, 0, 0);
        MAXHP = new Stat('MAXHP', 0, 0, 0, 0);
        MAXMP = new Stat('MAXMP', 0, 0, 0, 0);
        LUCK = new Stat('LUCK', 0, 0, 0, 0);

        PATK = new Stat('PATK', 0, 0, 0, 0);
        MATK = new Stat('MATK', 0, 0, 0, 0);
        PDEF = new Stat('PDEF', 0, 0, 0, 0);
        MDEF = new Stat('MDEF', 0, 0, 0, 0);
        ATKSPD = new Stat('ATKSPD', 0, 0, 0, 0);
        CAST = new Stat('CAST', 0, 0, 0, 0);
        ACCU = new Stat('ACCU', 0, 0, 0, 0);
        MACC = new Stat('MACC', 0, 0, 0, 0);
        MRESIST = new Stat('MRESIST', 0, 0, 0, 0);
        CRIT = new Stat('CRIT', 0, 0, 0, 0);
        CRITPOW = new Stat('CRITPOW', 0, 0, 0, 0);
        BLOCK = new Stat('BLOCK', 0, 0, 0, 0);
        EVA = new Stat('EVA', 0, 0, 0, 0);
        HPREGEN = new Stat('HPREGEN', 0, 0, 0, 0);
        MPREGEN = new Stat('MPREGEN', 0, 0, 0, 0);        
        WEIGHT = new Stat('WEIGHT', 0, 0, 0, 0);


        if (typeof BeltSlot_1 !== "undefined" && BeltSlot_1 !== null) {
            ProcesarPet(BeltSlot_1);
        };
        if (typeof BeltSlot_2 !== "undefined" && BeltSlot_2 !== null) {
            ProcesarPet(BeltSlot_2);
        };
        if (typeof BeltSlot_3 !== "undefined" && BeltSlot_3 !== null) {
            ProcesarPet(BeltSlot_3);
        };
        if (typeof BeltSlot_4 !== "undefined" && BeltSlot_4 !== null) {
            ProcesarPet(BeltSlot_4);
        };
        if (typeof BeltSlot_5 !== "undefined" && BeltSlot_5 !== null) {
            ProcesarPet(BeltSlot_5);
        };
        if (typeof BeltSlot_6 !== "undefined" && BeltSlot_6 !== null) {
            ProcesarPet(BeltSlot_6);
        };
        if (typeof BeltSlot_7 !== "undefined" && BeltSlot_7 !== null) {

        };
        if (typeof BeltSlot_8 !== "undefined" && BeltSlot_8 !== null) {

        };

    } catch (e) {
        console.log(e);
    }
}

function ProcesarPet(pBeltSlot) {
    if (typeof pBeltSlot !== "undefined" && pBeltSlot !== null) {

        pBeltSlot.stats.forEach(function (_petStat) {            
            CalcularStat(_petStat, true);
        });
    };
}

function CalcularStat(_petStat, pCalcular) {
    if (typeof _petStat !== "undefined" && _petStat !== null) {
        var _Stat = window[_petStat.name];
            if (typeof _Stat !== "undefined" && _Stat !== null) {
                
                if (pCalcular == true) {  
                    
                    var old_val = parseFloat(_Stat.percentage); //console.log('old_val:' + old_val);
                    var new_val = parseFloat(_petStat.value); //console.log('new_val:' + new_val);
                    var times = 0;
                    var _extra = 0;

                    _Stat.extra += new_val;
                    _Stat.setTimes++; 

                    // Bono hasta 3 pets (la primera no cuenta):
                    if (_Stat.setTimes > 1) {
                        if (_Stat.setTimes < 4) {    
                            times = _Stat.setTimes;
                        } else { times = 3; }
                    } else {
                        times = 0;
                    };
                    
                    //console.log(times);

                    /*  +1% x cada pet que aporte la misma stat
                     *  Max % = 33%
                     *  30% + 1% x Pet  */
                    var _setval = (old_val + new_val + times); //console.log('_setval:' + _setval);
                    if (_setval > 30) {    
                        if (times > 1) {
                            _Stat.percentage = 30 + times;
                            _extra = _Stat.extra - _Stat.percentage;
                        } else {
                            _Stat.percentage = 30 ;
                            _extra = _Stat.extra - _Stat.percentage;
                        }
                    } else {
                        _Stat.percentage = _setval;
                        _extra = 0;
                    };
                }
                
                //"&nbsp;<spam style='color:red'>(0% Extra)</spam>&nbsp;<spam style='color:greenyellow'>+0</spam>"
                var set_html = '';
                if (parseFloat(_Stat.percentage) > 0) {  set_html = parseFloat(_Stat.percentage).toFixed(1) + '%'; }

                if (_extra > 0) {
                    set_html += "&nbsp;<spam style='color:red'>(" + parseFloat(_extra).toFixed(1) + '% Extra)</spam>';
                };
                if (_Stat.value > 0) {
                    set_html += "&nbsp;<spam style='color:greenyellow'>+" + parseFloat(_Stat.value).toFixed(1) + "</spam>";
                };

                //Mostar el bonus para la Stat en su Control correspondiente:
                $('#text-' + _petStat.name).html(set_html);
               // console.log(_Stat);

                //console.log(_petStat.name);
                if (_petStat.name == 'VIT') {
                    /* 1 Vit = 1,6 P.Def and 33 Max HP */
                    window['PDEF'].value += 1.6 * _Stat.percentage; CalcularStat(window['PDEF'], false);
                    window['MAXHP'].value += 33 * _Stat.percentage; CalcularStat(window['MAXHP'], false);
                }
                if (_petStat.name == 'STR') {
                    /* 1 Str = 2,8 P.Atk, 10 carrying capacity */
                    window['PATK'].value += 2.8 * _Stat.percentage; CalcularStat(window['PATK'], false);
                    window['WEIGHT'].value += 10 * _Stat.percentage; CalcularStat(window['WEIGHT'], false);
                }
                if (_petStat.name == 'AGI') {
                    /* 1 Agi = 0.5 Evasion, 1.2 P.Atk (Ranged), 0.1 Atk.Spd */
                    window['EVA'].value += 0.5 * _Stat.percentage; CalcularStat(window['EVA'], false);
                    window['PATK'].value += 1.2 * _Stat.percentage; CalcularStat(window['PATK'], false);
                    window['ATKSPD'].value += 0.1 * _Stat.percentage; CalcularStat(window['ATKSPD'], false);
                }
                if (_petStat.name == 'INT') {
                    /* 1 Int = 2 M.Atk and 30 Max MP */
                    window['MATK'].value += 2 * _Stat.percentage; CalcularStat(window['MATK'], false);
                    window['MAXMP'].value += 30 * _Stat.percentage; CalcularStat(window['MAXMP'], false);
                }                
                if (_petStat.name == 'WIS') {
                    /* 1 Wis = 2 M.Def, 0.5 M.Acc, 0.5 M.Res and 4.1 MP Recov. */
                    window['MDEF'].value += 2 * _Stat.percentage; CalcularStat(window['MDEF'], false);
                    window['MACC'].value += 0.5 * _Stat.percentage; CalcularStat(window['MACC'], false);
                    window['MPREGEN'].value += 4.1 * _Stat.percentage; CalcularStat(window['MPREGEN'], false);
                    window['MRESIST'].value += 0.5 * _Stat.percentage; CalcularStat(window['MRESIST'], false);
                }
                if (_petStat.name == 'DEX') {
                    /* 1 Dex = 2.2 P.Atk (Ranged), 0.5 Accuracy */
                    window['PATK'].value += 2.2 * _Stat.percentage; CalcularStat(window['PATK'], false);
                    window['ACCU'].value += 0.5 * _Stat.percentage; CalcularStat(window['ACCU'], false);
                } 
                if (_petStat.name == 'DEX') {
                    /* 1 Dex = 2.2 P.Atk (Ranged), 0.5 Accuracy */
                    window['PATK'].value += 2.2 * _Stat.percentage; CalcularStat(window['PATK'], false);
                    window['ACCU'].value += 0.5 * _Stat.percentage; CalcularStat(window['ACCU'], false);
                } 
                if (_petStat.name == 'LUCK') {
                    /* 1 Luck = 0.2% Critical Ratio and Drop Rate. */
                    window['CRIT'].value += 0.2 * _Stat.percentage; CalcularStat(window['CRIT'], false);
                }                 
                
            };
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
