"use strict";(self.webpackChunksocial_network=self.webpackChunksocial_network||[]).push([[956],{7956:function(e,s,a){a.r(s),a.d(s,{default:function(){return R}});var t=a(7781),n=a(8687),i=a(4487),r=(a(2791),a(5705)),l=a(501),c="Dialog_dialog__KmWt2",o="Dialog_dialogLink__yC8Aj",u="Dialog_active__379ih",g=a(184),d=function(e){return(0,g.jsx)("div",{className:c,children:(0,g.jsx)(l.OL,{to:"/dialogs/".concat(e.id),className:function(e){return e.isActive?u:o},children:e.name})})},m="Message_message__lzZq3",_=function(e){return(0,g.jsx)("div",{className:m,children:e.text})},x="Dialogs_dialogs__RNcyk",h="Dialogs_title__8C0F4",f="Dialogs_dialogsWrapper__OLfKY",j="Dialogs_messagesWrapper__sz4JW",v="Dialogs_messageBlock__Nz6Un",p="Dialogs_newMessage__m1kLP",N="Dialogs_newMessageInput__YJRvX",b="Dialogs_btn__wuXyc",D="Dialogs_errors__bn7zn",y="Dialogs_form__VPdXH",k=function(e){var s=e.sendMessage;return(0,g.jsx)("div",{className:p,children:(0,g.jsx)(r.J9,{initialValues:{messageText:""},validate:function(e){return function(e){var s={};return e.messageText.length>300&&(s.messageText="Max length 300"),s}(e)},onSubmit:function(e,a){var t=a.setSubmitting,n=a.resetForm,i=e.messageText;s(i),t(!1),n()},children:function(e){var s=e.isSubmitting,a=e.touched,t=e.errors;return(0,g.jsxs)(r.l0,{className:y,children:[(0,g.jsx)(r.gN,{type:"textarea",name:"messageText",id:"messageText",placeholder:"input your message",className:N}),a.messageText&&t.messageText&&(0,g.jsx)("div",{className:D,children:t.messageText}),(0,g.jsx)("button",{type:"submit",disabled:s,className:b,children:"send"})]})}})})},w=function(e){var s=e.state.dialogs.map((function(e){return(0,g.jsx)(d,{id:e.id,name:e.name},e.id)})),a=e.state.messages.map((function(e){return(0,g.jsx)(_,{text:e.message},e.id)}));return(0,g.jsxs)("section",{className:x,children:[(0,g.jsxs)("div",{className:f,children:[(0,g.jsx)("h3",{className:h,children:"Dialogs"}),s]}),(0,g.jsxs)("div",{className:j,children:[(0,g.jsx)("h3",{className:h,children:"Name"}),(0,g.jsx)("div",{className:v,children:a}),(0,g.jsx)(k,{sendMessage:e.sendMessage})]})]})},T=a(8683),A=a(3366);var M=a(6871),O=["isAuth"],C=function(e){return{isAuth:e.authReducer.isAuth}},R=(0,t.qC)((0,n.$j)((function(e){return{state:e.dialogsReducer,isAuth:e.authReducer.isAuth}}),(function(e){return{sendMessage:function(s){e((0,i.X)(s))}}})),(function(e){return(0,n.$j)(C)((function(s){var a=s.isAuth,t=function(e,s){if(null==e)return{};var a,t,n=(0,A.Z)(e,s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)a=i[t],s.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}(s,O);return a?(0,g.jsx)(e,(0,T.Z)({},t)):(0,g.jsx)(M.Fg,{to:"/login"})}))}))(w)}}]);
//# sourceMappingURL=956.3f618e01.chunk.js.map