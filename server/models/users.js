'use strict';

const Promise = require('bluebird');
module.exports = function(Users) {
	/**
	*Metodo para crear un nuevo usuario
	*@param req
	*return {msg:algunmensaje,code:codigohttp}
	*/
	Users.createNewUser=function(req,cb){
		let data=req.body;
		let returnData={
			msg:'',
			code:200
		};
		returnData.msg="HACE FALTA ALGUN DATO EN LA PETICION";
		returnData.code=422;
		if(data==undefined) cb(null,returnData);
		Users.find({where:{email:data.email},limit:1}).then(result=>{
			
			if(result.length>0){
				returnData.msg="EL EMAIL YA ESTA EN USO";
				returnData.code=403;
			cb(null,returnData);
			}else{
				data.role=1;
				Users.create(data).then(finalresult=>{
						returnData.msg="USUARIO CREADO";
						returnData.code=201
					cb(null,returnData);
					}).catch(err=>{
						returnData.msg="ERROR EN EL SERVER";
						returnData.code=500;
					cb(null,returnData);
				});
			}
		}).catch(err=>{
			returnData.msg="ERROR EN EL SERVER";
			returnData.code=500;
		cb(null,returnData);
		});

	}
	Users.remoteMethod('createNewUser',{
		accepts:{arg: 'req', type: 'object', 'http': {source: 'req'}},
 		returns:{arg: 'res', type: 'object', 'http': {source: 'res'}},
 		http:{path: '/nuevoUsuario', verb: 'POST'}
	});

};
