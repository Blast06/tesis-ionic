export const URL_BASE= "http://178.128.183.171/api";
export const URL_ARTICULOS = URL_BASE + "/articles/all";
// export const URL_WEBSITE= "http://127.0.0.1:8000/api";

export const URL_SHOW_ARTICLES_WEBSITE_SUBSCRIBED= URL_BASE + "/articles/subscribed"; //RETORNA LISTA DE ARTICULOS DONDE USER ESTA SUSCRITO(PARA EL HOME)
export const URL_SHOW_SINGLE_ARTICLE = URL_BASE + "/articles/"; //MAS EL SLUG DEL ARTICULO = /{slug}.
export const URL_SIGNUP= "signup";

export const URL_LOGIN= "http://178.128.183.171" + "/oauth/token";
export const URL_SHOW_USER= URL_BASE + "/user";
export const URL_LOGOUT=  URL_BASE + "logout";
export const URL_SHOW_WEBSITE= URL_BASE + "/"; //-> MAS EL SLUG DEL WEBSITE =  /{sitio-slug} ->(que es el username)

export const URL_WEBSITE_SUSCRIBE = URL_BASE + "/"; //ESTA SERIA URL_BASE{website}/suscribe
export const URL_WEBSITE_UNSUSCRIBE = URL_BASE + "/"; //ESTA SERIA URL_BASE{website}/unsuscribe
export const URL_WEBSITE_IS_SUSCRIBED = URL_BASE + "/"; //ESTA SERIA URL_BASE{website}/unsuscribe

export const URL_CREATE_WEBSITE = URL_BASE + "/websites"; // ESTA VA ASI tesis.test/1/unfavorite
export const URL_ARTICLE_FAVORITE = URL_BASE + "/" ; // ESTA VA ASI tesis.test/1/favorite
export const URL_ARTICLE_UNFAVORITE = URL_BASE ; // ESTA VA ASI tesis.test/1/unfavorite
export const URL_ARTICLE_ISFAVORITED = URL_BASE ; // ESTA VA ASI tesis.test/1/unfavorite


export const URL_CREATE_ARTICLE = "http://178.128.183.171/client/"  ; //ESTA FUNCIONA ASI -> client/my-sitio/articles 
export const URL_SEND_ARTICLE_IMAGE = URL_BASE ; //DESPUES DE LA URL BASE, SE LE AGREGA EL ID DEL ARTICULO, ASI -> api/{mi-website}/articles/images
export const URL_SHOPPING_CART = URL_BASE + "/shopping/cart" ; //PARA OBTENER  los items del shopping cart + los favoritos
export const URL_SHOPPING_CART_COUNT = URL_BASE + "/shopping/cart/count" ; //PARA OBTENER la cantidad de items
export const URL_REMOVE_ARTICLE_SHOPPING_CART = URL_BASE ; //PARA eliminar articulo del carrito
export const URL_ADD_ARTICLE_SHOPPING_CART = URL_BASE ; //PARA agregar articulo
export const URL_MAKE_ORDER = URL_BASE + "/orders" ; //PARA agregar articulo










