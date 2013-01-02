
    //http://stackoverflow.com/questions/4197591/parsing-url-hash-fragment-identifier-with-javascript////////////////////
    //
        function getHashParams() {

            var hashParams = {};
            var i=0,
                e,
                ep,
                a = /\+/g,  // Regex for replacing addition symbol with a space
                r = /([^&;=]+)=?([^&;]*)/g,
                rp= /([^,]+)/g,
                d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
                q = window.location.hash.substring(1);

            while (e = r.exec(q))
            {
               hashParams[d(e[1])] = Array();
               i=0;
               while(  ep = rp.exec( d(e[2]) )  ) hashParams[ d(e[1]) ][ i++ ] = ep[0];

               //console.log( ep[0] );

            }

               //console.log(hashParams);
            return hashParams;

        }
    //
    //http://stackoverflow.com/questions/4197591/parsing-url-hash-fragment-identifier-with-javascript////////////////////



	//https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter#Compatibility/////////////////////////////
	//
		if (!Array.prototype.filter)
		{
		  Array.prototype.filter = function(fun /*, thisp */)
		  {
			"use strict";

			if (this === void 0 || this === null)
			  throw new TypeError();

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== "function")
			  throw new TypeError();

			var res = [];
			var thisp = arguments[1];
			for (var i = 0; i < len; i++)
			{
			  if (i in t)
			  {
				var val = t[i]; // in case fun mutates this
				if (fun.call(thisp, val, i, t))
				  res.push(val);
			  }
			}

			return res;
		  };
		}
	//
	//https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter#Compatibility/////////////////////////////

    //https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some/////////////////////////////////////////////
    //
        if (!Array.prototype.some)
        {
          Array.prototype.some = function(fun /*, thisp */)
          {
            "use strict";

            if (this === void 0 || this === null)
              throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
              throw new TypeError();

            var thisp = arguments[1];
            for (var i = 0; i < len; i++)
            {
              if (i in t && fun.call(thisp, t[i], i, t))
                return true;
            }

            return false;
          };
        }
    //
    //https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some/////////////////////////////////////////////







	//��� ������?
	function is_array( mixed_var )
    {
		return ( mixed_var instanceof Array );
	}
	//��� �� ������?
	function is_not_array( mixed_var )
    {
		return !( mixed_var instanceof Array );
	}
	//��� ������?
	function is_object( mixed_var )
    {
		if(mixed_var instanceof Array)
        {
			return false;
		}
        else
        {
			return (mixed_var !== null) && (typeof( mixed_var ) == 'object');
		}
	}
	//��� �� ������?
	function is_not_object( mixed_var )
    {
		return !is_object( mixed_var );
	}


	//��������� ��� ������� ����� indexOf - �������� �� ������ �������� needle, ���� ��, �� ����� ��� ����� � �������, ���� ���, �� ����� -1
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            "use strict";
            if (this === void 0 || this === null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (n !== n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        }
    }


	//��������� ��� ������� ����� fl
	if (!Array.prototype.find)
	{
			//						     function(�������, �����������_������)
			Array.prototype.find_check = function(terms  , checking_obj      )
			{
					/*
						terms == {
										name: "%rua",
										price: ">100"
						}

						checking_obj == {
											name:"Chianti Classico",
											price:"540.00",
											year:"Array"
						}
					*/

					var checked = true;
					for( key in terms )//���������� ��� ��������� � �������
					{
							/*
								checking_obj == {
													name:"Chianti Classico",
													price:"540.00",
													year:"Array"
								}

								checking_obj_value == "Chianti Classico";
							*/

							if(!checking_obj){ checked = false; continue; } //���� ����������� ������ �� ������
							if(!checking_obj[key]){ checked = false; continue; } //���� ����������� ������ �� �������� �����, ������� ���� � �������

							var term_value = terms[key]; // ">1000"
							var checking_obj_value = checking_obj[key];// "4000"

							//console.log('�������: ', term_value);

							if( is_array( term_value ) )//������� ����������� ���
							{
									/*
										term_value = [ >111, 222 ]
									*/
									checked = term_value.some(function( term_value_inner ){
										//console.log('term_value_inner:', term_value_inner, '  checking_obj_value:', checking_obj_value);
										//console.log('[].find_check({ x:term_value_inner },{ x:checking_obj_value}):', [].find_check({ x:term_value_inner },{ x:checking_obj_value}));
										//return (checking_obj_value == term_value_inner);
										return [].find_check({ x:term_value_inner },{ x:checking_obj_value});
									});
							}
							else
							{
									var parsing_array = /^(%?|<=?|<?|>?|>=?|><?)([^%<=>]+)(%?)$/i.exec( term_value );

									//console.log(parsing_array);

									var prolog_term = parsing_array[1];
									var body_term = parsing_array[2];
									var epilog_term = parsing_array[3]

									//console.log('prolog_term:', prolog_term, '  body_term:', body_term, '  epilog_term:' ,epilog_term);

									if( prolog_term == '>=' )//������� �����������
									{
											//console.log(  );
											checked = checked && ( parseFloat(checking_obj_value) >= parseFloat(body_term)) ;
									}
									else if( prolog_term == '<=' )//������� �����������
									{
											//console.log(  );
											checked = checked &&
											(
												parseFloat(checking_obj_value) <= parseFloat(body_term)
											);
									}
									else if( prolog_term == '><' )//������� �����������
									{
											//console.log(  );
											var parsing_body_term_array = /^([^;]+)(;+)([^;]+)$/i.exec( body_term );
											var body_term_first = parsing_body_term_array[1];
											var body_term_second = parsing_body_term_array[3];

											//console.log('body_term_first=',body_term_first,' body_term_second=',body_term_second);

											checked = checked &&
											(
												parseFloat(checking_obj_value) >= parseFloat(body_term_first)
												&&
												parseFloat(checking_obj_value) <= parseFloat(body_term_second)
											);
									}
									else if( prolog_term == '>' )//������� �����������
									{
											//console.log(  );
											checked = checked && ( parseFloat(checking_obj_value) > parseFloat(body_term) );
									}
									else if( prolog_term == '<' )//������� �����������
									{
											//console.log(  );
											checked = checked && ( parseFloat(checking_obj_value) < parseFloat(body_term) );
									}
									else if( prolog_term == '%' && epilog_term == '%' )//������� ����������� �� ��������� ���������
									{
											checked = checked && ( checking_obj_value.toLowerCase().indexOf( body_term.toLowerCase() ) >= 0 );
									}
									else if( prolog_term == '%' )//������� ����������� �� ������ ��������� ( "%text" )
									{
											checked = checked && ( checking_obj_value.toLowerCase().indexOf( body_term.toLowerCase() ) == (checking_obj_value.length - body_term.length ) );
									}
									else if( epilog_term == '%' )//������� ����������� �� ����� ��������� ( "text%" )
									{
											checked = checked && ( checking_obj_value.toLowerCase().indexOf( body_term.toLowerCase() ) == 0 );
									}
									else//����� ������� ��������� �� ���������
									{
											//console.log('checking_obj_value: '+checking_obj_value + '  term_value:' + term_value + '  checking_obj.NAME:' + checking_obj.NAME);
											checked = checked && ( checking_obj_value == term_value );
									}
							}


							if(!checked) return false;//���� �����-�� ������� �� ������, �� ������ ���������� �� ����� ������.
					}

					return checked;
			}

			Array.prototype.find = function(condition /*, from*/)
			{

					var len = this.length >>> 0, from = 0, result = [], _self = this;

					result = this.filter(function( element ){

						return ( _self.find_check( condition, element ) );

					});

					/*result = function(_self){
												return _self.filter(function(element){

													return ( _self.find_check( condition, element ) );

												});
					}(this);*/


					/*result = this.filter(function(_self){
															return function( element ){

																return ( _self.find_check( condition, element ) );

															}
					}(this));*/

					/*for (; from < len; from++)//���������� ��� �������� �������
					{
						if( this.find_check(condition, this[from]) )//��� ������� �������� ������� ��������� �������, ���� ��� ����������� �������� ������� � result
						{
                            result.push(this[from]);
						}
					}*/

					if( result.length > 0 )
						return result;
					else
						return [];
			};

            Array.prototype.pages = function(elt)
			{
					//catalog.pages({ page:0, elements_on_page:12 });
					var len = this.length >>> 0, from = (elt.page)*elt.elements_on_page, to = (elt.page+1)*elt.elements_on_page, result = [];  if(to>len)to=len;

					result.count_of_pages = Math.ceil( len / elt.elements_on_page );
					result.current_page = elt.page;

                    //console.log('from('+from+') < to('+to+')');
					for (; from < to; from++)
					{
							result.push(this[from]);
					}

                    //console.log('pages.result',result,'pages.length='+result.length);

					if( result.length > 0 )
						return result;
					else
						return [];
			};
	}