export const URL_BASE= "http://127.0.0.1:8000/api";
export const URL_ARTICULOS = URL_BASE + "/articles/all";
export const URL_WEBSITE= "http://127.0.0.1:8000/api";

export const URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED= URL_BASE + "/articles/subscribed"; //RETORNA LISTA DE ARTICULOS DONDE USER ESTA SUSCRITO(PARA EL HOME)
export const URL_SHOW_SINGLE_ARTICLE = URL_BASE + "/articles/"; //MAS EL SLUG DEL ARTICULO = /{slug}.
export const URL_SIGNUP= "signup";
export const URL_LOGIN= "http://127.0.0.1:8000/oauth/token";
export const URL_SHOW_USER= "http://127.0.0.1:8000/api/user";
export const URL_LOGOUT=  URL_BASE + "logout";
export const URL_SHOW_WEBSITE= URL_BASE + "/"; //-> MAS EL SLUG DEL WEBSITE =  /{sitio-slug} ->(que es el username)

export const URL_WEBSITE_SUSCRIBE = URL_BASE + "/"; //ESTA SERIA URL_BASE{website}/suscribe
export const URL_WEBSITE_UNSUSCRIBE = URL_BASE + "/"; //ESTA SERIA URL_BASE{website}/unsuscribe

export const URL_ARTICLE_FAVORITE = URL_BASE + "/" ; // ESTA VA ASI tesis.test/1/favorite
export const URL_ARTICLE_UNFAVORITE = URL_BASE ; // ESTA VA ASI tesis.test/1/unfavorite
export const URL_CREATE_ARTICLE = URL_BASE ; //ESTA FUNCIONA ASI -> api/my-sitio/articles 
export const URL_SEND_ARTICLE_IMAGE = URL_BASE ; //DESPUES DE LA URL BASE, SE LE AGREGA EL ID DEL ARTICULO, ASI -> api/{mi-website}/articles/images








