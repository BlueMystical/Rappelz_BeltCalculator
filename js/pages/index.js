var jsonPet_list = null;
var jsonPet_abilities = null;

var jsonBossCardsList = null;
var jsonBossCardsData = null;

var selected_slot = null;
var selected_pets = null;

var maxStatPercentage = 30;

class BeltSlot {
    constructor(pet_name, stage, stats, info) {
        this.slot_id = '';
        this.card_type = 'pet';
        this.pet_name = pet_name;
        this.stage = stage;
        this.stats = stats;
        this.info = info;
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

var PPIERCE = new Stat('PPIERCE', 0, 0, 0, 0);
var MPIERCE = new Stat('MPIERCE', 0, 0, 0, 0);
var PIGNORE = new Stat('PIGNORE', 0, 0, 0, 0);
var MIGNORE = new Stat('MIGNORE', 0, 0, 0, 0);

//Esto se usa para leer archivos desde JQuery:
var files;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fs = null;
var ShareDeckToCopy = null;
var AwakeningBonusShown = false;

// https://craftpip.github.io/jquery-confirm

function Iniciar() {
    //Cargar Datos de los JSON
    try {
        $('#grpBoss').hide();
        CargarDatosJSON();

        //Revisa si hay parametros en la URL:
        var Param = urlParam('deck');
        if (typeof Param !== "undefined" && Param !== null && Param !== '') {
            var uri_dec = decodeURIComponent(Param);
            LoadDeck(JSON.parse(uri_dec));
        }
    } catch (e) {
        console.log(e.message);
    }

    // Obtiene los Valores Iniciales del Tamaño de la Ventana
    var winWidth = $(window).width();
    var winHeight = $(window).height() - 50;


    /******** AQUI SE ENLAZAN LOS EVENTOS DE LOS CONTROLES ***********/
    var _state = false;
    $("#flipPetBossGrps").change(function () {
        _state = !_state;
        if (_state == true) {
            $('#grpPet').hide();
            $('#grpBoss').show();
        } else {
            $('#grpPet').show();
            $('#grpBoss').hide();
        }
    });
    $("#checkAwakenedBelt").change(function () {
        var _IsAwakened = $('#checkAwakenedBelt').is(':checked');
        CalcularBeltStats();
    });
    $("#cboBeltEnchantment").change(function () {
        var _Limit = $('#cboBeltEnchantment').val();
        $("#lblYushivaBelt").text('Stats Cap: ' + _Limit + '%');
        CalcularBeltStats();
    });

    $(document).on("click", "#cmdSetPetInBelt", function (evt) {
        //console.log(_state.toString());
        if (_state == false) {
            var _pet = $('#cboPetChoose').val().trim();
            var _stage = $('#cboPetStage').val().trim();

            SetPetCard(selected_slot, _pet, _stage);
        } else {
            var _cardName = $('#cboBossChoose').val().trim();
            SetBossCard(_cardName);
        }
    });

    $(document).on("click", "#cmdInfo", function (evt) {
        //console.log('info');
    });

    $(document).on("click", "#BeltSlot_1", function (evt) {
        selected_slot = 'BeltSlot_1';
        showPopUp(false, true);
    });
    $(document).on("click", "#BeltSlot_2", function (evt) {
        selected_slot = 'BeltSlot_2';
        showPopUp(false, false);
    });
    $(document).on("click", "#BeltSlot_3", function (evt) {
        selected_slot = 'BeltSlot_3';
        showPopUp(false, false);
    });
    $(document).on("click", "#BeltSlot_4", function (evt) {
        selected_slot = 'BeltSlot_4';
        showPopUp(false, false);
    });
    $(document).on("click", "#BeltSlot_5", function (evt) {
        selected_slot = 'BeltSlot_5';
        showPopUp(false, true);
    });
    $(document).on("click", "#BeltSlot_6", function (evt) {
        selected_slot = 'BeltSlot_6';
        showPopUp(false, true);
    });
    $(document).on("click", "#BeltSlot_7", function (evt) {
        selected_slot = 'BeltSlot_7';
        showPopUp(true, false);
    });
    $(document).on("click", "#BeltSlot_8", function (evt) {
        selected_slot = 'BeltSlot_8';
        showPopUp(true, false);
    });

    $(document).on("click", "#cmdBackHome", function (evt) {
        //window.location.reload(); //<- Fuerza la recarga de la pagina.
        window.location = './';
    });

    $(document).on("click", "#cmdSearchPets", function (evt) {
        //Abre el Panel Lateral para Buscar Pets:
        $("#SearchPanel").panel("open");
    });

    $(document).on("click", "#cmdInfo", function (evt) {
        //Muestra el Cuadro de Informacion
        $('#popINFO').popup("open");
    });

    $(document).on("click", "#cmdShareDeck", function (evt) {
        console.log('Sharing Your Deck..');
        ShareDeck();
    });

    $(document).on("click", "#cmdShareDeck", function (evt) {

        if (typeof ShareDeckToCopy !== "undefined" && ShareDeckToCopy !== null) {
            // console.log(ShareDeckToCopy);
            ShareDeckToCopy.player = $("#txtPlayer_Name").val();
            $('#txtShareDeck').text('https://bluemystical.github.io/Rappelz_BeltCalculator/?deck=' + JSON.stringify(ShareDeckToCopy));

            var copyTextarea = $('#txtShareDeck');
            copyTextarea.focus();
            copyTextarea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }

        }
    });


    $("#txtPlayer_Name").bind("change", function (event, ui) {
        if (typeof ShareDeckToCopy !== "undefined" && ShareDeckToCopy !== null) {
            //console.log(ShareDeckToCopy);
            ShareDeckToCopy.player = $("#txtPlayer_Name").val();

            $('#txtShareDeck').text('https://bluemystical.github.io/Rappelz_BeltCalculator/?deck=' + JSON.stringify(ShareDeckToCopy));
        }
    });

    $('#cboSearchStat').on('change', function () {
        //Busca la pet seleccionada:
        var mSeleccionado = $(this).val();
        console.log(mSeleccionado);
        SearchPetsCards(mSeleccionado);
    });

    //- Evento al seleccionar un elemento del ListView:
    $(document).on("click", "#listSearchPets li", function (evt) {
        var _Pet = $(this).data("datos"); //<- Obtiene los datos del elemento seleccionado
        console.log(_Pet);
        ShowPetInfo(_Pet);
    });

}

function CargarDatosJSON() {
    //Cargar los Datos de las Abilidades de los Pets:
    /*$.getJSON('data/pet_card_abilities.json', function (data) {
        jsonPet_abilities = data;
    });*/ // <- Quitado xQ la carga es Asyncronica, 
    $.ajax({ //<- este modo espera a que termine la tarea
        url: 'data/pet_card_abilities.json',
        dataType: 'json',
        async: false,
        data: null,
        success: function (data) {
            jsonPet_abilities = data;
        }
    });

    //Cargar los Datos de las BossCards:
    $.ajax({ //<- este modo espera a que termine la tarea
        url: 'data/boss_cards.json',
        dataType: 'json',
        async: false,
        data: null,
        success: function (data) {
            jsonBossCardsData = data;
        }
    });
    /*$.getJSON('data/boss_cards.json', function (data) {
            jsonBossCardsData = data;
        });*/


    //Cargar la lista de BossCards:
    $.ajax({ //<- este modo espera a que termine la tarea
        url: 'data/boss_list.json',
        dataType: 'json',
        async: false,
        data: null,
        success: function (data) {
            jsonBossCardsList = data; //<- Se guarda en memoria para otros usos.

            if (typeof jsonBossCardsList !== "undefined" && jsonBossCardsList !== null) {
                //Carga la Lista de Boss en un Combo:
                var ListVar = $("#cboBossChoose");
                ListVar.empty();
                ListVar.append('<option></option>'); //<- Primera Opcion del Menu Vacia

                jsonBossCardsList.forEach(function (_card) {
                    //console.log(_pet); 
                    var opt = $("<option>" + _card.boss_name + "</option>").attr("value", _card.short_name);
                    ListVar.append(opt);
                });
                ListVar.selectmenu().selectmenu('refresh', true);
            }
        }
    });
    /*$.getJSON('data/boss_list.json', function (data) {
            jsonBossCardsList = data;

            if (typeof jsonBossCardsList !== "undefined" && jsonBossCardsList !== null) {
                //Carga la Lista de Pets en un Combo:
                var ListVar = $("#cboBossChoose");
                ListVar.empty();
                ListVar.append('<option></option>'); //<- Primera Opcion del Menu Vacia

                jsonBossCardsList.forEach(function (_card) {
                    //console.log(_pet); // short_name, boss_name
                    var opt = $("<option>" + _card.boss_name + "</option>").attr("value", _card.short_name);
                    ListVar.append(opt);
                });
                ListVar.selectmenu().selectmenu('refresh', true);
            }
        });*/

    //Carga los Nombres de los Pets:
    $.ajax({ //<- este modo espera a que termine la tarea
        url: 'data/pet_list.json',
        dataType: 'json',
        async: false,
        data: null,
        success: function (data) {
            jsonPet_list = data; //<- Se guarda en memoria para otros usos.
            if (typeof jsonPet_list !== "undefined" && jsonPet_list !== null) {

                //Ordena la lista de Pets x Tier:
                jsonPet_list.sort(function (a, b) {
                    return (a.tier > b.tier) ? 1 : ((b.tier > a.tier) ? -1 : 0);
                });
                //console.log(jsonPet_list);

                //Carga la Lista de Pets en un Combo:
                var ListVar = $("#cboPetChoose");
                ListVar.empty();
                ListVar.append('<option></option>'); //<- Primera Opcion del Menu Vacia

                var _Tier = '';
                jsonPet_list.forEach(function (_pet) {
                    //console.log(_pet);
                    if (_pet.tier !== _Tier) {
                        //Cuando cambia de Tier, se cierra el grupo:
                        if (_Tier !== '') {
                            ListVar.append('</optgroup>');
                        }

                        _Tier = _pet.tier; //Y se abre un nuevo grupo:
                        ListVar.append("<optgroup label='" + _Tier + "'>");
                    }

                    //Aqui se agrega a cada Pet:
                    var opt = $("<option>" + _pet.pet_name + "</option>").attr("value", _pet.pet_name);
                    ListVar.append(opt);
                });
                //Y se refresca la lista:
                ListVar.selectmenu().selectmenu('refresh', true);
            }
        }
    });
    /* $.getJSON('data/pet_list.json', function (data) {
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
     });*/
}

function SetPetCard(_SlotId, _pet, _stage) {
    /*  ESTABLECE LA PET SELECCIONADA **/

    /*var _pet = $('#cboPetChoose').val().trim();
    var _SlotId = selected_slot.substring(selected_slot.length - 1, selected_slot.length);
    var _stage = $('#cboPetStage').val().trim(); */

    /*console.log(_SlotId);
    console.log(_pet);
    console.log(_stage);*/

    try {
        _SlotId = selected_slot.substring(selected_slot.length - 1, selected_slot.length);

        if (typeof _pet !== "undefined" && _pet !== null && _pet !== '') {

            //1.Cambiar la Imagen de la Pet Seleccionada:     
            var img_name = 'img/pets/' + _pet + '.jpg';
            $('#' + selected_slot).attr("src", img_name);

            //2.Obtener los datos de la Pet:
            var _petData = jsonPet_abilities.filter(function (item) {
                return item.pet_name.trim() === _pet;
            });
            if (typeof _petData !== "undefined" && _petData !== null) {
                //console.log(_petData);
                //Instancio una Variable Global con la Informacion de la Pet grabada en el Slot Seleccionado:
                window[selected_slot] = new BeltSlot(_pet, parseInt(_stage), null, null);
                window[selected_slot].slot_id = selected_slot;
                window[selected_slot].card_type = 'pet';
                window[selected_slot].stats = [];

                //Texto Sobre la Imagen del Pet:
                var _petBonus = '<p style="font-size:8px">' + _pet + '<br>Stage: ' + _stage;
                var _petTitle = _pet + ' (Stage ' + _stage + '): ';

                //3.Establecer las Abilidades que ofrece el Pet:               
                _petData.forEach(function (_petInfo) {
                    //console.log(_petInfo);
                    var stat_value = parseFloat(_petInfo['s' + _stage]);
                    window[selected_slot].stats.push(new Stat(_petInfo.ability.trim(), stat_value, 0, 0, 0));

                    //4. Mostrar sobre la imagen del Pet sus Datos:
                    _petBonus += '<br>' + _petInfo.ability.trim() + ': ' + stat_value + '%';
                    _petTitle += ', ' + _petInfo.ability.trim() + ': ' + stat_value + '%';

                    $('#' + selected_slot).attr("alt", _petTitle);
                    $('#' + selected_slot + 'a').attr("title", _petTitle);
                    $('#' + selected_slot + 'b').html(_petBonus + '</p>');

                });

                console.log(window[selected_slot]);

                //5. Re-calcular Todas las Stats
                CalcularBeltStats();
            }

        } else {
            var img_id = '';
            switch (_SlotId) {
                case '1':
                    img_id = 'img/card_any.jpg';
                    break;
                case '2':
                    img_id = 'img/card_pet_0.jpg';
                    break;
                case '3':
                    img_id = 'img/card_pet_1.jpg';
                    break;
                case '4':
                    img_id = 'img/card_pet_2.jpg';
                    break;
                case '5':
                    img_id = 'img/card_any.jpg';
                    break;
                case '6':
                    img_id = 'img/card_any.jpg';
                    break;
                case '7':
                    img_id = 'img/card_boss.jpg';
                    break;
                case '8':
                    img_id = 'img/card_boss.jpg';
                    break;

                default:
                    break;
            }
            //console.log(img_id);      
            //console.log(selected_slot);

            //Clear the Pet Slot;
            window[selected_slot] = null;
            $('#' + selected_slot).attr("src", img_id);
            $('#' + selected_slot + 'b').html('');

            CalcularBeltStats();
        }
        hidePopUp();
    } catch (e) {
        console.log(e.message);
    }
}

function SetBossCard(_cardName) {
    try {
        //var _cardName = $('#cboBossChoose').val().trim();

        if (typeof _cardName !== "undefined" && _cardName !== null && _cardName !== '') {

            //1.Cambiar la Imagen de la BossCard Seleccionada:     
            var img_name = 'img/boss_cards/' + _cardName + '.png';
            $('#' + selected_slot).attr("src", img_name);

            //2.Obtener los datos de la BossCard:
            var _BossData = jsonBossCardsData.filter(function (item) {
                return item.short_name.trim() === _cardName;
            });

            if (typeof _BossData !== "undefined" && _BossData !== null) {
                //console.log(_BossData);

                //Instancio una Variable Global con la Informacion de la Pet grabada en el Slot Seleccionado:
                window[selected_slot] = new BeltSlot(_cardName, 0, null, null);
                window[selected_slot].slot_id = selected_slot;
                window[selected_slot].card_type = 'boss';
                window[selected_slot].stats = [];
                window[selected_slot].info = _BossData[0].extra;

                //Texto Sobre la Imagen del Pet:
                var _petBonus = '<p style="font-size:8px">' + _cardName;
                var _petTitle = _cardName + ': ';

                //3.Establecer las Abilidades que ofrece el Pet:               
                _BossData.forEach(function (_CardInfo) {

                    var stat_value = parseFloat(_CardInfo.value);
                    var stat_perce = parseFloat(_CardInfo.percentage);
                    var stat_extra = parseFloat(_CardInfo.extra);

                    window[selected_slot].stats.push(new Stat(_CardInfo.ability.trim(), stat_value, stat_perce, stat_extra, 0));

                    //4. Mostrar sobre la imagen del Pet sus Datos:
                    if (stat_value == 0 && stat_perce !== 0) {
                        stat_value = stat_perce + '%';
                    }

                    _petBonus += '<br>' + _CardInfo.ability.trim() + ': +' + stat_value;
                    _petTitle += ', ' + _CardInfo.ability.trim() + ': +' + stat_value;
                });

                $('#' + selected_slot).attr("alt", _petTitle);
                $('#' + selected_slot + 'a').attr("title", _petTitle);
                $('#' + selected_slot + 'b').html(_petBonus + '</p>');

                //console.log(_petBonus);
                console.log(window[selected_slot]);

                //5. Re-calcular Todas las Stats
                CalcularBeltStats();
            }
        } else {
            //Clear the Pet Slot;
            window[selected_slot] = null;
            $('#' + selected_slot).attr("src", 'img/card_boss.jpg');
            $('#' + selected_slot + 'b').html('');

            //5. Re-calcular Todas las Stats
            CalcularBeltStats();
        }
        hidePopUp();
    } catch (e) {
        console.log(e.message);
    }
}

function CalcularBeltStats() {
    try {
        //1. Re-setear todas las stats a Cero:
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
        CAST = new Stat('CASTSPD', 0, 0, 0, 0);
        ACCU = new Stat('ACCU', 0, 0, 0, 0);
        MACC = new Stat('MACC', 0, 0, 0, 0);
        CRIT = new Stat('CRIT', 0, 0, 0, 0);
        CRITPOW = new Stat('CRITPOW', 0, 0, 0, 0);
        BLOCK = new Stat('BLOCK', 0, 0, 0, 0);
        EVA = new Stat('EVA', 0, 0, 0, 0);
        HPREGEN = new Stat('HPREGEN', 0, 0, 0, 0);
        MPREGEN = new Stat('MPREGEN', 0, 0, 0, 0);
        MRESIST = new Stat('MRESIST', 0, 0, 0, 0);
        WEIGHT = new Stat('WEIGHT', 0, 0, 0, 0);

        PPIERCE = new Stat('PPIERCE', 0, 0, 0, 0);
        MPIERCE = new Stat('MPIERCE', 0, 0, 0, 0);
        PIGNORE = new Stat('PIGNORE', 0, 0, 0, 0);
        MIGNORE = new Stat('MIGNORE', 0, 0, 0, 0);

        //2. Limpiar todos los Cuadros:
        $('#text-EXTRA').val('');

        $('#text-VIT').empty();
        $('#text-STR').empty();
        $('#text-AGI').empty();
        $('#text-DEX').empty();

        $('#text-INT').empty();
        $('#text-WIS').empty();
        $('#text-LUCK').empty();

        $('#text-MAXHP').empty();
        $('#text-PATK').empty();
        $('#text-PDEF').empty();
        $('#text-ATKSPD').empty();
        $('#text-ACCU').empty();
        $('#text-CRIT').empty();
        $('#text-BLOCK').empty();
        $('#text-HPREGEN').empty();
        $('#text-MRES').empty();
        $('#text-PPIERCE').empty();
        $('#text-PIGNORE').empty();

        $('#text-MAXMP').empty();
        $('#text-MATK').empty();
        $('#text-MDEF').empty();
        $('#text-CAST').empty();
        $('#text-MACC').empty();
        $('#text-CRITPOW').empty();
        $('#text-EVA').empty();
        $('#text-MPREGEN').empty();
        $('#text-WEIGHT').empty();
        $('#text-MPIERCE').empty();
        $('#text-MIGNORE').empty();

        $("#cboEXTRABonus").empty();
        AwakeningBonusShown = false;

        //console.log('Cuadros limpios!');
        //console.log(BeltSlot_1);

        if (typeof BeltSlot_1 !== "undefined" && BeltSlot_1 !== null) {
            ProcesarPet(BeltSlot_1);
            ProcesarBossCard(BeltSlot_1);
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
            ProcesarBossCard(BeltSlot_5);
        };
        if (typeof BeltSlot_6 !== "undefined" && BeltSlot_6 !== null) {
            ProcesarPet(BeltSlot_6);
            ProcesarBossCard(BeltSlot_6);
        };
        if (typeof BeltSlot_7 !== "undefined" && BeltSlot_7 !== null) {
            ProcesarBossCard(BeltSlot_7);
        };
        if (typeof BeltSlot_8 !== "undefined" && BeltSlot_8 !== null) {
            ProcesarBossCard(BeltSlot_8);
        };

    } catch (e) {
        console.log(e);
    }
}

function ProcesarPet(pBeltSlot) {
    if (typeof pBeltSlot !== "undefined" && pBeltSlot !== null) {
        //Procesa cada una de las Stats cargadas en el Slot:
        pBeltSlot.stats.forEach(function (_petStat) {
            CalcularStat(_petStat, true);
        });
    };
}

function ProcesarBossCard(pBeltSlot) {
    if (typeof pBeltSlot !== "undefined" && pBeltSlot !== null) {

        console.log(pBeltSlot);
        if (pBeltSlot.card_type === 'boss') {

            //Bonus Extra que la la BossCard cuando el belt tiene el Final Awakening:
            var _Bonus = 0; //<- en %
            var _Limit = $('#cboBeltEnchantment').val(); //<- Stats Cap.
            var _IsAwakened = $('#checkAwakenedBelt').is(':checked');

            if (_IsAwakened == true) {
                switch (_Limit) {
                    case '30.0':
                        _Bonus = 0;
                        break;
                    case '31.0':
                        _Bonus = 10;
                        break;
                    case '31.5':
                        _Bonus = 15;
                        break;
                    case '32.0':
                        _Bonus = 20;
                        break;
                    case '32.5':
                        _Bonus = 25;
                        break;
                    case '33.0':
                        _Bonus = 30;
                        break;
                    case '33.5':
                        _Bonus = 35;
                        break;
                    default:
                        _Bonus = 0;
                }
            }

            var ListVar = $("#cboEXTRABonus"); //<- Mustra una leyenda 

            //Agrega el bonus extra de la BossCard (no todas tienen):
            if (typeof pBeltSlot.info !== "undefined" && pBeltSlot.info !== null && pBeltSlot.info !== '') {
                var opt = $("<option>" + pBeltSlot.info + "</option>").attr("value", pBeltSlot.info);
                ListVar.append(opt);
            }
            //Agrega el bonus x Awakening del Belt:        
            if (_IsAwakened == true && AwakeningBonusShown == false) {
                AwakeningBonusShown = true;
                var opt = $("<option>" + '[Awakened Bonuses] Amplify Ability of Equiped Boss Card: ' + _Bonus + '%' + "</option>")
                    .attr("value", 'Awakened');
                ListVar.append(opt);
            }
            ListVar.selectmenu().selectmenu('refresh', true);

            //Muestra las Stats ganadas por la Carta:
            pBeltSlot.stats.forEach(function (_BossStat) {
                CalcularBossStats(_BossStat, true);
            });
        };
    };
}

function CalcularStat(_petStat, pCalcular) {
    if (typeof _petStat !== "undefined" && _petStat !== null) {

        var _Stat = window[_petStat.name.trim()];

        if (typeof _Stat !== "undefined" && _Stat !== null) {
            var times = 0;
            var _extra = 0;
            var _Limit = $('#cboBeltEnchantment').val(); //<- 30 es el maximo sin Yushiva encantado
            var _IsAwakened = $('#checkAwakenedBelt').is(':checked');
            var _IsYushivaBelt = false;

            if (pCalcular == true) {

                var old_val = parseFloat(_Stat.percentage);
                var new_val = parseFloat(_petStat.value);

                //console.log(_Limit);

                _Stat.extra += new_val;
                _Stat.setTimes++;

                // Bono de 1% hasta 3 pets (la primera no cuenta):
                if (_Stat.setTimes > 1) {
                    if (_Stat.setTimes < 4) {
                        times = _Stat.setTimes;
                    } else {
                        times = 3;
                    }
                } else {
                    times = 0;
                };

                /*  +1% x cada pet que aporte la misma stat
                 *  Max % = 33%
                 *  30% + 1% x Pet  
                 *  Yushiva Belt No tiene Bono ni limite    */
                
                //var _setval = (old_val + new_val + times); //+1% x cada pet que aporte la misma stat
                var _setval = (old_val + new_val); //Sin Stacking
                if (_setval > _Limit) {
                    if (times > 1) {
                        if (_IsYushivaBelt == false) {
                            _Stat.percentage = _Limit + times;
                        } else {
                            _Stat.percentage = _Limit;
                        }
                        _extra = _Stat.extra - _Stat.percentage;
                    } else {
                        _Stat.percentage = _Limit;
                        _extra = _Stat.extra - _Stat.percentage;
                    }
                } else {
                    _Stat.percentage = _setval;
                    _extra = 0;
                };
            }

            //console.log(_Stat.name + ' %:' + _Stat.percentage);
            //console.log(_Stat.name + ' Val:' + _Stat.value);
           // console.log(_Stat.name + ' Ex:' + _extra);

            //"&nbsp;<spam style='color:red'>(0% Extra)</spam>&nbsp;<spam style='color:greenyellow'>+0</spam>"
            var set_html = '';
            if (parseFloat(_Stat.percentage) > 0) {
                set_html = parseFloat(_Stat.percentage).toFixed(1) + '%';
            }

            if (_extra > 0) {
                set_html += "&nbsp;<spam style='color:red'>(" + parseFloat(_extra).toFixed(1) + '% Wasted)</spam>';
            };
            if (_Stat.value > 0) {
                set_html += "&nbsp;<spam style='color:greenyellow'>+" + parseFloat(_Stat.value).toFixed(1) + "</spam>";
            };

            //Mostar el bonus para la Stat en su Control correspondiente:
            $('#text-' + _petStat.name).html(set_html);
            //console.log(set_html);

            //console.log(_petStat.name);
            if (_petStat.name == 'VIT') {
                /* 1 Vit = 1,6 P.Def and 33 Max HP */
                window['PDEF'].value += 1.6 * _Stat.percentage;
                CalcularStat(window['PDEF'], false);
                window['MAXHP'].value += 33 * _Stat.percentage;
                CalcularStat(window['MAXHP'], false);
            }
            if (_petStat.name == 'STR') {
                /* 1 Str = 2,8 P.Atk, 10 Max.Weight */
                window['PATK'].value += 2.8 * _Stat.percentage;
                CalcularStat(window['PATK'], false);
                window['WEIGHT'].value += 10 * _Stat.percentage;
                CalcularStat(window['WEIGHT'], false);
            }
            if (_petStat.name == 'AGI') {
                /* 1 Agi = 0.5 Evasion, 1.2 P.Atk (Ranged), 0.1 Atk.Spd */
                window['EVA'].value += 0.5 * _Stat.percentage;
                CalcularStat(window['EVA'], false);
                window['PATK'].value += 1.2 * _Stat.percentage;
                CalcularStat(window['PATK'], false);
                window['ATKSPD'].value += 0.1 * _Stat.percentage;
                CalcularStat(window['ATKSPD'], false);
            }
            if (_petStat.name == 'INT') {
                /* 1 Int = 2 M.Atk and 30 Max MP */
                window['MATK'].value += 2 * _Stat.percentage;
                CalcularStat(window['MATK'], false);
                window['MAXMP'].value += 30 * _Stat.percentage;
                CalcularStat(window['MAXMP'], false);
            }
            if (_petStat.name == 'WIS') {
                /* 1 Wis = 2 M.Def, 0.5 M.Acc, 0.5 M.Res and 4.1 MP Recov. */
                window['MDEF'].value += 2 * _Stat.percentage;
                CalcularStat(window['MDEF'], false);
                window['MACC'].value += 0.5 * _Stat.percentage;
                CalcularStat(window['MACC'], false);
                window['MPREGEN'].value += 4.1 * _Stat.percentage;
                CalcularStat(window['MPREGEN'], false);
                window['MRESIST'].value += 0.5 * _Stat.percentage;
                CalcularStat(window['MRESIST'], false);
            }
            if (_petStat.name == 'DEX') {
                /* 1 Dex = 2.2 P.Atk (Ranged), 0.5 Accuracy */
                window['PATK'].value += 2.2 * _Stat.percentage;
                CalcularStat(window['PATK'], false);
                window['ACCU'].value += 0.5 * _Stat.percentage;
                CalcularStat(window['ACCU'], false);
            }
            if (_petStat.name == 'DEX') {
                /* 1 Dex = 2.2 P.Atk (Ranged), 0.5 Accuracy */
                window['PATK'].value += 2.2 * _Stat.percentage;
                CalcularStat(window['PATK'], false);
                window['ACCU'].value += 0.5 * _Stat.percentage;
                CalcularStat(window['ACCU'], false);
            }
            if (_petStat.name == 'LUCK') {
                /* 1 Luck = 0.2% Critical Ratio and Drop Rate. */
                window['CRIT'].value += 0.2 * _Stat.percentage;
                CalcularStat(window['CRIT'], false);
            }

        };
    };
}

function CalcularBossStats(_BossStat, pCalcular) {
    if (typeof _BossStat !== "undefined" && _BossStat !== null) {

        var _Stat = window[_BossStat.name.trim()];
        if (typeof _Stat !== "undefined" && _Stat !== null) {

            var _extra = 0;
            var _Bonus = 0;
            var _IsAwakened = $('#checkAwakenedBelt').is(':checked');
            var _Limit = $('#cboBeltEnchantment').val();
            //var isNegative = false;

            //console.log('Awake:' + _IsAwakened);
            //console.log('Limit:' + _Limit);

            console.log('IsBossCard!');

            if (_IsAwakened == true) {
                switch (_Limit) {
                    case '30.0':
                        _Bonus = 0;
                        break;
                    case '31.0':
                        _Bonus = 10;
                        break;
                    case '31.5':
                        _Bonus = 15;
                        break;
                    case '32.0':
                        _Bonus = 20;
                        break;
                    case '32.5':
                        _Bonus = 25;
                        break;
                    case '33.0':
                        _Bonus = 30;
                        break;
                    case '33.5':
                        _Bonus = 35;
                        break;
                    default:
                        _Bonus = 0;
                }
            }
            //console.log('Bonus:' + _Bonus);

            if (pCalcular == true) {
                
                var old_val = parseFloat(_Stat.value);
                var new_val = parseFloat(_BossStat.value);

                var old_per = parseFloat(_Stat.percentage);
                var new_per = parseFloat(_BossStat.percentage);
                
                console.log(_Stat.name + ' OLD %:' + old_per);
                console.log(_Stat.name + ' NEW %:' + new_per);
                
                //if(parseFloat(_BossStat.percentage) < 0){ isNegative = true; }

                _Stat.extra += new_per;
                _Stat.value = old_val + new_val;
                _Stat.percentage = old_per + (new_per + (new_per * _Bonus / 100));

                console.log(_Stat.name + ' POST %:' + _Stat.percentage);

                //Establece el Limite para las BossCards:  (*no hay limite*)
                //if (_Stat.percentage > _Limit) {
                //    _Stat.extra = _Stat.percentage - _Limit;
                //    _Stat.percentage = _Limit;                    
                //    _extra = _Stat.extra;
                //}
                //console.log('extra:' + _extra);
            }

            var set_html = '&nbsp;';
            //if (isNegative == true) { set_html += '-'; }
            set_html += parseFloat(_Stat.percentage).toFixed(1) + '%';

            if (Math.abs(_extra) > 0) {
                set_html += "&nbsp;<spam style='color:red'>(" + parseFloat(Math.abs(_extra)).toFixed(1) + '% Wasted)</spam>';
            };
            if (parseFloat(_Stat.value) > 0) {
                set_html += "&nbsp;<spam style='color:greenyellow'>+" + parseFloat(_Stat.value).toFixed(1) + "</spam>";
            };

            //Mostar el bonus para la Stat en su Control correspondiente:            
            $('#text-' + _BossStat.name).html(set_html);

            //CalcularStat(window[_BossStat.name], true);

            if (_BossStat.name == 'VIT') {
                /* 1 Vit = 1,6 P.Def and 33 Max HP */
                window['PDEF'].value += 1.6 * _Stat.percentage;
                CalcularStat(window['PDEF'], false);
                window['MAXHP'].value += 33 * _Stat.percentage;
                CalcularStat(window['MAXHP'], false);
            }
            if (_BossStat.name == 'STR') {
                /* 1 Str = 2,8 P.Atk, 10 Max.Weight */
                window['PATK'].value += 2.8 * _Stat.percentage;
                CalcularStat(window['PATK'], false);
                window['WEIGHT'].value += 10 * _Stat.percentage;
                CalcularStat(window['WEIGHT'], false);
            }
            if (_BossStat.name == 'AGI') {
                /* 1 Agi = 0.5 Evasion, 1.2 P.Atk (Ranged), 0.1 Atk.Spd */
                window['EVA'].value += 0.5 * _Stat.percentage;
                CalcularStat(window['EVA'], false);
                window['PATK'].value += 1.2 * _Stat.percentage;
                CalcularStat(window['PATK'], false);
                window['ATKSPD'].value += 0.1 * _Stat.percentage;
                CalcularStat(window['ATKSPD'], false);
            }
            if (_BossStat.name == 'INT') {
                /* 1 Int = 2 M.Atk and 30 Max MP */
                window['MATK'].value += 2 * _Stat.percentage;
                CalcularStat(window['MATK'], false);
                window['MAXMP'].value += 30 * _Stat.percentage;
                CalcularStat(window['MAXMP'], false);
            }
            if (_BossStat.name == 'WIS') {
                /* 1 Wis = 2 M.Def, 0.5 M.Acc, 0.5 M.Res and 4.1 MP Recov. */
                window['MDEF'].value += 2 * _Stat.percentage;
                CalcularStat(window['MDEF'], false);
                window['MACC'].value += 0.5 * _Stat.percentage;
                CalcularStat(window['MACC'], false);
                window['MPREGEN'].value += 4.1 * _Stat.percentage;
                CalcularStat(window['MPREGEN'], false);
                window['MRESIST'].value += 0.5 * _Stat.percentage;
                CalcularStat(window['MRESIST'], false);
            }
            if (_BossStat.name == 'DEX') {
                /* 1 Dex = 2.2 P.Atk (Ranged), 0.5 Accuracy */
                window['PATK'].value += 2.2 * _Stat.percentage;
                CalcularStat(window['PATK'], false);
                window['ACCU'].value += 0.5 * _Stat.percentage;
                CalcularStat(window['ACCU'], false);
            }
            if (_BossStat.name == 'DEX') {
                /* 1 Dex = 2.2 P.Atk (Ranged), 0.5 Accuracy */
                window['PATK'].value += 2.2 * _Stat.percentage;
                CalcularStat(window['PATK'], false);
                window['ACCU'].value += 0.5 * _Stat.percentage;
                CalcularStat(window['ACCU'], false);
            }
            if (_BossStat.name == 'LUCK') {
                /* 1 Luck = 0.2% Critical Ratio and Drop Rate. */
                window['CRIT'].value += 0.2 * _Stat.percentage;
                CalcularStat(window['CRIT'], false);
            }

        };
    };
}


function SearchPetsCards(_petStat) {
    //BUSCA LAS PETS Y BOSS QUE TENGAN EL ATRIBUTO INDICADO
    var _petData = jsonPet_abilities.filter(function (item) {
        return item.ability.trim() === _petStat;
    });
    //Buscar Tambien en las Boss Cards:
    var _BossData = jsonBossCardsData.filter(function (item) {
        return item.ability.trim() === _petStat;
    });
    console.log(_petData);
    console.log(_BossData);

    var HTML = ""; //<- Contendral el HTML de los elementos por agregar 
    $("#listSearchPets").empty(); //<- Borra todos los elementos presentes en el ListView

    if (typeof _petData !== "undefined" && _petData !== null && _petData.length > 0) {
        HTML += '<li data-role="list-divider">Pet Cards</li>';
        //Por cada dato en el conjunto de datos:
        _petData.forEach(function (Dato) {
            //El dato particular se almacena en el atributo 'data-datos' de cada elelmento de la lista
            HTML += "<li data-datos='" + JSON.stringify(Dato) + "'><a href='#'><img src='./img/pets/" + Dato.pet_name + ".jpg'>" +
                "<h2>" + Dato.pet_name + "</h2><p>" + Dato.ability + ' ' + Dato.s5 + "% S5</p></a></li>";
        });
    }

    if (typeof _BossData !== "undefined" && _BossData !== null && _BossData.length > 0) {
        //Por cada dato en el conjunto de datos:
        HTML += '<li data-role="list-divider">Boss Cards</li>';

        _BossData.forEach(function (Dato) {
            var hayValor = "";
            if (Dato.value !== 0) {
                hayValor = ' +' + Dato.value;
            }
            var hayPorciento = "";
            if (Dato.percentage !== 0) {
                hayPorciento = ' ' + Dato.percentage + '%';
            }

            //El dato particular se almacena en el atributo 'data-datos' de cada elelmento de la lista
            HTML += "<li data-datos='" + JSON.stringify(Dato) + "'><a href='#'><img src='./img/boss_cards/" + Dato.short_name + ".png'>" +
                "<h2>" + Dato.boss_name + "</h2><p>" + Dato.ability + hayValor + hayPorciento + "</p></a></li>";
        });
    }

    if (typeof HTML !== "undefined" && HTML !== null && HTML !== "") {
        $("#listSearchPets").append(HTML).listview("refresh"); //<- Agrega los nuevos elementos y actualiza el control
        $("#listSearchPets").listview().trigger('create');
    }
}

function ShowPetInfo(_Pet) {
    //BUSCA LOS DATOS DE LA PET INDICADA
    if (typeof _Pet !== "undefined" && _Pet !== null) {


        var pDatos = jsonPet_abilities.filter(function (item) {
            return item.pet_name.trim() === _Pet.pet_name;
        });
        //console.log(pDatos);
        if (typeof pDatos !== "undefined" && pDatos !== null && pDatos.length > 0) {

            //Carga la Imagen de la Pet:
            var img_name = 'img/pets/' + _Pet.pet_name + '.jpg';
            $('#popPetInfo_Imagen').attr("src", img_name);
            $('#popPetInfo_Title').html("<h2>" + _Pet.pet_name + " (s0)</h2>");
            //console.log(img_name);

            //Carga los datos en un ListView
            try {
                if (pDatos != null) {
                    var HTML = ""; //<- Contendral el HTML de los elementos por agregar 
                    $("#popPetInfo_List").empty(); //<- Borra todos los elementos presentes en el ListView
                    pDatos.forEach(function (Dato) {
                        HTML += "<li>" + Dato.ability + ": " + Dato.s0 + "%</li>";
                    });

                    $("#popPetInfo_List").append(HTML).listview("refresh"); //<- Agrega los nuevos elementos y actualiza el control
                    $("#popPetInfo_List").listview().trigger('create');
                }
            } catch (e) {
                console.log(e.stack);
            }
        } else {
            console.log('Es una Boss Card!' + _Pet.short_name);
            console.log(_Pet);

            //BUSCAR EN LAS BOSS CARDS:
            pDatos = jsonBossCardsData.filter(function (item) {
                return item.short_name.trim() === _Pet.short_name;
            });
            console.log(pDatos);
            if (typeof pDatos !== "undefined" && pDatos !== null && pDatos.length > 0) {
                //Carga la Imagen de la Pet:
                var img_name = 'img/boss_cards/' + _Pet.short_name + '.png';
                $('#popPetInfo_Imagen').attr("src", img_name);
                $('#popPetInfo_Title').html("<h2>" + _Pet.boss_name + "</h2>");
                //console.log(img_name);

                //Carga los datos en un ListView
                try {
                    if (pDatos != null) {
                        var HTML = ""; //<- Contendral el HTML de los elementos por agregar 
                        $("#popPetInfo_List").empty(); //<- Borra todos los elementos presentes en el ListView

                        pDatos.forEach(function (_CardInfo) {
                            var stat_value = parseFloat(_CardInfo.value);
                            var stat_perce = parseFloat(_CardInfo.percentage);
                            var stat_extra = _CardInfo.extra;

                            if (stat_value == 0 && stat_perce !== 0) {
                                stat_value = stat_perce + '%';
                            }

                            HTML += "<li>" + _CardInfo.ability + ": +" + stat_value + "</li>";

                            //console.log(stat_extra);
                            if (typeof stat_extra !== "undefined" && stat_extra !== null && stat_extra !== "") {
                                HTML += "<li>" + stat_extra + "</li>";
                            }
                        });

                        $("#popPetInfo_List").append(HTML).listview("refresh"); //<- Agrega los nuevos elementos y actualiza el control
                        $("#popPetInfo_List").listview().trigger('create');
                    }
                } catch (e) {
                    console.log(e.stack);
                }
            }
        }
    }

    $("#popPetInfo").popup("open", {
        positionTo: 'window',
        transition: "flip"
    });
}


function LoadDeck(pDeckData) {
    //Abre la Pagina con la Deck:
    try {
        if (typeof pDeckData !== "undefined" && pDeckData !== null && pDeckData !== '') {
            console.log(pDeckData);

            //1. Carga la 2ª Pagina:
            event.preventDefault();
            location.hash = "#page2";

            //2. Muestra el Nombre del Autor de la Deck:
            $('#lblTituloP2').html("Belt Deck By <b style='color:Gold;'>" + pDeckData.player + '</b>');
            $('#cboBeltEnchantment').val(pDeckData.belt_enchant);

            //3. Carga las 'Cards' indicadas en la DEck:
            if (typeof pDeckData.belt_slots !== "undefined" && pDeckData.belt_slots !== null && pDeckData.belt_slots.length > 0) {
                pDeckData.belt_slots.forEach(function (_BeltSlot) {
                    selected_slot = _BeltSlot.id;

                    if (_BeltSlot.type == 'pet') {
                        $('#cboPetChoose').val(_BeltSlot.card); //.selectmenu('refresh');
                        $('#cboPetStage').val(_BeltSlot.stage); //.selectmenu('refresh');

                        SetPetCard(_BeltSlot.id, _BeltSlot.card, _BeltSlot.stage);
                    } else {
                        $('#cboBossChoose').val(_BeltSlot.card);
                        SetBossCard(_BeltSlot.card);
                    }
                });
            }
        }
    } catch (e) {
        console.log(e.message);
    }
}

function ShareDeck() {

    var BeltDeck = {
        player: "Unknown",
        belt_enchant: $('#cboBeltEnchantment').val(),
        belt_slots: []
    };

    var i;
    for (i = 1; i <= 8; i++) {
        var _Slut = window['BeltSlot_' + i];
        if (_Slut !== "undefined" && _Slut != null) {
            var BeltSlotX = {
                id: _Slut.slot_id,
                type: _Slut.card_type,
                card: _Slut.pet_name,
                stage: _Slut.stage
            };
            BeltDeck.belt_slots.push(BeltSlotX);
        }
    }
    //console.log(BeltDeck);

    ShareDeckToCopy = BeltDeck;
    var uri_enc = 'https://bluemystical.github.io/Rappelz_BeltCalculator/?deck=' + JSON.stringify(BeltDeck).trim();

    $('#txtShareDeck').text(uri_enc);
    $('#popShareDeck').popup("open");
}

/******* AQUI VAN OTRAS FUNCIONES COMPLEMENTARIAS ***************/
//Esta funcion devuelve el valor del parametro especificado si existe
function urlParam(pNombreParametro) {
    var results = new RegExp('[\\?&]' + pNombreParametro + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

function showPopUp(ShowBoss, CanChoose) {
    _state = ShowBoss;
    //console.log(CanChoose);
    if (CanChoose == true) {
        $('#BeggersArentChoosers').show();
    } else {
        $('#BeggersArentChoosers').hide();
    }

    if (ShowBoss == true) {
        $('#grpPet').hide();
        $('#grpBoss').show();

        $('#flipPetBossGrps').prop("checked", true).flipswitch("refresh");
    } else {
        $('#grpPet').show();
        $('#grpBoss').hide();

        $('#flipPetBossGrps').prop("checked", false).flipswitch("refresh");
    }
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

function supports_html5_storage() {
    //Verifica el soperte del navegador para HTML5 y Local Storage
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
