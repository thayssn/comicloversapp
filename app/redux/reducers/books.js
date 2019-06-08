const INITIAL_STATE = [
  {
    _id: 1,
    title: 'Liga da Justiça - Torre de Babel',
    cover: {uri: 'https://abrilsuperinteressante.files.wordpress.com/2018/07/torredebabel.jpg'}
  },
  {
    _id: 2,
    title: 'Superman - O Homem de Aço',
    cover: {uri: 'http://www.vortexcultural.com.br/images/2016/04/Superman-O-Homem-de-A%C3%A7o-capa.jpg'}
  },
  {
    _id: 3,
    title: ' Lanterna Verde - A Guerra dos Anéis',
    cover: {uri: 'https://images-na.ssl-images-amazon.com/images/I/51yRtsbrQuL._SX329_BO1,204,203,200_.jpg'}
  },
  {
    _id: 4,
    title: 'Demolidor Por Frank Miller & Klaus Janson volume 1',
    cover: {uri: 'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=8360446&qld=90&l=430&a=-1'}
  },
  {
    _id: 5,
    title: 'AKIRA',
    cover: {uri: 'https://images-na.ssl-images-amazon.com/images/I/51F94nOGBRL._SX345_BO1,204,203,200_.jpg'}
  },
]

export default function books(state = INITIAL_STATE, action){
  switch(action.type){
    default:
      return state;
  }
}