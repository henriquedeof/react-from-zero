
import { useState, createContext, useEffect } from 'react';
import firebase from '../../../../../../Users/henri/Downloads/chamados/110/src/services/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);//Quando clicar em logar, a TELA de loading de autenticar usuario eh ativada.
                                                                 // True enquanto fazendo a requisicao de login. False quando a requisicao for finalizada.
  const [loading, setLoading] = useState(true); // Utilizado no arquivo de 'Route.js' da aplicacao.

  //verifica se existe algum usuario, no momento em que o <AuthProvider> (que esta no App.js) eh montado na pagina.
  useEffect(()=>{

    function loadStorage(){
      const storageUser = localStorage.getItem('SistemaUser');

      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
  
      setLoading(false);
    }
    
    loadStorage();

  }, [])


  //Fazendo login do usuario
  async function signIn(email, password){
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value)=> {
      let uid = value.user.uid;

      const userProfile = await firebase.firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        avatarUrl: userProfile.data().avatarUrl,
        email: value.user.email
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      toast.success('Bem vindo de volta!');


    })
    .catch((error)=>{
      console.log(error);
      toast.error('Ops algo deu errado!');
      setLoadingAuth(false);
    })

  }


  //Cadastrando um novo usuario
  async function signUp(email, password, nome){
    setLoadingAuth(true);

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async (value)=>{
      let uid = value.user.uid;

      await firebase.firestore().collection('users')
      .doc(uid).set({
        nome: nome,
        avatarUrl: null,
      })
      .then( () => {

        let data = {
          uid: uid,
          nome: nome,
          email: value.user.email,
          avatarUrl: null
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success('Bem vindo a plataforma!');

      })

    })
    .catch((error)=>{
      console.log(error);
      toast.error('Ops algo deu errado!');
      setLoadingAuth(false);
    })

  }



  function storageUser(data){
    localStorage.setItem('SistemaUser', JSON.stringify(data));
  }



  //Logout do usuario
  async function signOut(){
    await firebase.auth().signOut();
    localStorage.removeItem('SistemaUser');
    setUser(null);
  }


  return(
    <AuthContext.Provider 
    value={{ 
      signed: !!user,  
      user, 
      loading, 
      signUp,
      signOut,
      signIn,
      loadingAuth,
      setUser,
      storageUser
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
