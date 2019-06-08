const INITIAL_STATE = [
  {
    _id: 1,
    title: 'Marvel Deluxe: Demolidor',
    cover: {uri: 'https://http2.mlstatic.com/marvel-deluxe-demolidor-revelado-capa-dura-lacrada-D_NQ_NP_424215-MLB25191398286_112016-F.jpg'}
  },
  {
    _id: 2,
    title: 'One Piece',
    cover: {uri: 'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=3891375&qld=90&l=430&a=-1'}
  },
  {
    _id: 3,
    title: 'Sandman',
    cover: {uri: 'https://bythebookgeek.com/894-thickbox_default/the-absolute-sandman-vol-1.jpg'}
  }
]

export default function collections(state = INITIAL_STATE, action){
  switch(action.type){
    default:
      return state;
  }
}