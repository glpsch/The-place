!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e){console.log("Something went wrong :( "+e)}n.r(t);class r{constructor(e){this.popup=e,this.popup.querySelector(".popup__close").addEventListener("click",this.close.bind(this)),document.addEventListener("keydown",e=>{27==e.keyCode&&this.close()}),document.addEventListener("mousedown",e=>{e.target.classList.contains("popup")&&this.close()})}open(){this.popup.classList.add("popup_is-opened")}close(){this.popup.classList.remove("popup_is-opened")}}class i extends r{open(){if(!this.popup.classList.contains("popup_profile")){const e=this.popup.querySelector(".popup__button");e.setAttribute("disabled",!0),e.classList.add("popup__button_inactive")}this.popup.classList.add("popup_is-opened")}close(){const e=document.querySelectorAll(".popup__input_error");if(this.popup.classList.remove("popup_is-opened"),this.popup.querySelector(".popup__form").reset(),this.popup.classList.contains("popup_profile")){const e=this.popup.querySelector(".popup__button");e.removeAttribute("disabled"),e.classList.remove("popup__button_inactive"),this.popup.querySelector("#name").value=document.querySelector(".user-info__name").textContent,this.popup.querySelector("#info").value=document.querySelector(".user-info__job").textContent}for(const t of e)t.parentNode.classList.remove("input-container_invalid"),t.textContent=""}onUpload(e){this.text=e,(this.popup.querySelector(".popup__button_save")||this.popup.querySelector(".popup__button_add")).textContent=this.text}}class s{constructor(e,t,n,o,r,i,s,a=0){this.template=e,this.cardname=t,this.cardimage=n,this.cardOwnerId=r,this.userId=i,this.cardId=o,this.api=s,this.likes=a}like(e){e.target.classList.toggle("place-card__like-icon_liked"),e.target.classList.contains("place-card__like-icon_liked")?this.api.addLike(this.cardId).then(t=>{e.target.parentElement.querySelector(".place-card__like-count").textContent=t.likes.length}).catch(o):this.api.removeLike(this.cardId).then(t=>{e.target.parentElement.querySelector(".place-card__like-count").textContent=t.likes.length}).catch(o)}remove(e){if(window.confirm("Вы действительно хотите удалить эту карточку?")){let t=e.composedPath()[2];e.target.parentElement.parentElement.parentElement.removeChild(t),this.api.removeCard(this.cardId).catch(o)}}create(){let e=this.template.cloneNode(!0);return e.querySelector(".place-card__image").style.backgroundImage="url("+this.cardimage+")",e.querySelector(".place-card__name").textContent=this.cardname,e.querySelector(".place-card__like-count").textContent=this.likes.length||0,this.cardOwnerId!==this.userId&&(e.querySelector(".place-card__delete-icon").style.display="none"),(this.likes||[]).find(e=>e._id==this.userId)&&e.querySelector(".place-card__like-icon").classList.add("place-card__like-icon_liked"),e.querySelector(".place-card__like-icon").addEventListener("click",this.like.bind(this)),this.cardOwnerId==this.userId&&e.querySelector(".place-card__delete-icon").addEventListener("click",this.remove.bind(this)),e}}class a{constructor(e,t,n){this.popup=n,this.container=e,this.cardArray=t}addCard(e){this.container.appendChild(e),this.popup.close()}render(){this.cardArray.forEach(e=>{this.container.appendChild(e)})}}class c{constructor(e,t,n,o,r,i,s){this.popup=n,this.name=e,this.info=t,this.userNameInput=o,this.userInfoInput=r,this.defaultName=i,this.defaultInfo=s}setUserInfo(e,t){this.name=e,this.info=t}updateUserInfo(){this.defaultName.textContent=this.name,this.defaultInfo.textContent=this.info,this.userNameInput.value=this.defaultName.textContent,this.userInfoInput.value=this.defaultInfo.textContent}}class u{constructor(e){this.form=e}checkInputValidity(e){this.element=e;const t=document.querySelector("#error-"+this.element.id);return this.element.checkValidity()?(this.element.parentNode.classList.remove("input-container_invalid"),this.element.textContent="",t.classList.remove("input-container_invalid"),!0):(t.textContent="Это обязательное поле",(this.element.validity.tooShort||this.element.validity.tooLong)&&(t.textContent="Должно быть от 2 до 30 символов"),this.element.validity.typeMismatch&&(t.textContent="Здесь должна быть ссылка"),this.element.parentNode.classList.add("input-container_invalid"),t.classList.add("input-container_invalid"),!1)}setSubmitButtonState(e){this.form=e;const t=Array.from(this.form.elements),n=this.form.elements.button;let o=!0;t.forEach(e=>{e.checkValidity()||(o=!1)}),o?(n.removeAttribute("disabled"),n.classList.remove("popup__button_inactive")):(n.setAttribute("disabled",!0),n.classList.add("popup__button_inactive"))}validateFormInputs(e){e.preventDefault(),this.setSubmitButtonState(this.form)}handleValidateForm(e){this.checkInputValidity(e.target)}setEventListeners(e){this.form=e,this.form.addEventListener("input",this.validateFormInputs.bind(this)),this.form.querySelectorAll("input").forEach(function(e){e.addEventListener("input",this.handleValidateForm.bind(this))}.bind(this))}}class l{constructor(e,t){this.server=e,this.authorizationToken=t}getDefaultUserInfo(){return fetch(this.server,{headers:{authorization:this.authorizationToken}}).then(e=>e.ok?e.json():Promise.reject("error: "+e.status))}uploadUserInfo(e,t){return this.name=e,this.info=t,fetch(this.server,{method:"PATCH",headers:{authorization:this.authorizationToken,"Content-Type":"application/json"},body:JSON.stringify({name:this.name,about:this.info})}).then(e=>e.ok?e.json():Promise.reject("error: "+e.status))}getInitialCards(){return fetch(this.server,{headers:{authorization:this.authorizationToken}}).then(e=>e.ok?e.json():Promise.reject("error: "+e.status)).then(e=>e)}uploadNewCard(e,t){return this.title=e,this.link=t,fetch(this.server,{headers:{authorization:this.authorizationToken,"Content-Type":"application/json"},method:"POST",body:JSON.stringify({name:this.title,link:this.link})}).then(e=>e.ok?e.json():Promise.reject("error: "+e.status))}removeCard(e){return this.cardId=e,fetch(this.server+this.cardId,{headers:{authorization:this.authorizationToken,"Content-Type":"application/json"},method:"DELETE"}).then(e=>{if(!e.ok)return Promise.reject("error: "+e.status)})}addLike(e){return this.cardId=e,fetch(this.server+"like/"+this.cardId,{method:"PUT",headers:{authorization:this.authorizationToken,"Content-Type":"application/json"}}).then(e=>e.ok?e.json():Promise.reject("error: "+e.status))}removeLike(e){return this.cardId=e,fetch(this.server+"like/"+this.cardId,{method:"DELETE",headers:{authorization:this.authorizationToken,"Content-Type":"application/json"}}).then(e=>e.ok?e.json():Promise.reject("error: "+e.status))}changeAvatar(e){return this.link=e,fetch(this.server+"/avatar",{method:"PATCH",headers:{authorization:this.authorizationToken,"Content-Type":"application/json"},body:JSON.stringify({avatar:this.link})}).then(e=>e.ok?e.json():Promise.reject("error: "+e.status))}}!function(){const e=document.querySelector(".places-list"),t=document.querySelector(".user-info__button"),n=document.querySelector(".popup_add-card"),d=document.querySelector(".user-info__button-edit"),p=document.querySelector(".popup_profile"),h=document.querySelector(".popupImage"),m=document.querySelector(".popup__image"),f=document.querySelector('form[name="user"]'),_=f.querySelector("#name"),v=f.querySelector("#info");let y=document.querySelector(".user-info__name"),k=document.querySelector(".user-info__job");const b=document.querySelector('form[name="new"]'),S=document.querySelector("#place-card-template").content.querySelector(".place-card"),g=document.querySelector(".popup_avatar"),L=document.querySelector('form[name="avatar"]'),I=document.querySelector(".user-info__photo"),q=new l("https://praktikum.tk/cohort9/users/me","6d533b35-4b93-4063-8918-2ae34c6610b3");q.getDefaultUserInfo().then(e=>{y.textContent=e.name,k.textContent=e.about,_.value=e.name,v.value=e.about,I.style.backgroundImage="url("+e.avatar+")"}).catch(o);const C=new l("https://praktikum.tk/cohort9/cards/","6d533b35-4b93-4063-8918-2ae34c6610b3");C.getInitialCards().then(t=>{const n=t.map((function(e){return new s(S,e.name,e.link,e._id,e.owner._id,"d635114492a656d23a0d726c",C,e.likes).create()}));new a(e,n,E,s).render()}).catch(o);const E=new i(n);t.addEventListener("click",E.open.bind(E));const j=new i(p);d.addEventListener("click",j.open.bind(j));const w=new c("initial name","initial info",j,_,v,y,k),x=new r(h);new u(f).setEventListeners(f),new u(b).setEventListeners(b);const T=new a(e,[],E);T.render();const P=new i(p),z=new i(g);I.addEventListener("click",z.open.bind(z)),new u(L).setEventListeners(L),L.addEventListener("submit",e=>{e.preventDefault(),z.onUpload("Загрузка..");const t=L.elements.avatar_url.value;q.changeAvatar(t).then(e=>{I.style.backgroundImage="url("+e.avatar+")",z.close()}).catch(o).finally((function(){z.onUpload("Сохранить")}))}),b.addEventListener("submit",e=>{e.preventDefault(),E.onUpload("···");const t=b.elements.title,n=b.elements.link,r=t.value,i=n.value;C.uploadNewCard(r,i).then(e=>{const o=new s(S,t.value,n.value,e._id,e.owner._id,"d635114492a656d23a0d726c",C,e.likes);T.addCard(o.create())}).catch(o).finally((function(){E.onUpload("+")}))}),f.addEventListener("submit",e=>{e.preventDefault(),P.onUpload("Загрузка.."),q.uploadUserInfo(_.value,v.value).then(e=>{w.setUserInfo(e.name,e.about),w.updateUserInfo(),P.close()}).catch(o).finally((function(){P.onUpload("Сохранить")}))}),e.addEventListener("click",(function(e){if(e.target.classList.contains("place-card__image")){x.open();let t=e.target.getAttribute("style").slice(23,-3);m.querySelector("img").src=t}}))}()}]);