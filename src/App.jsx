import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    nome: '',
    editora: '',
    autor: '',
    isbn: '',
    genero:'',
  });

  useEffect(() => {
    fetchLivros();
  }, []);
  
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:8090/livros');
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };
  /*POST*/
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/livros', novoLivro);
      fetchLivros();
      setNovoLivro({
        nome: '',
        editora: '',
        autor: '',
        genero:'',
        isbn: '',
      });  
    } catch (error) {
      console.error('Erro ao criar livros:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/livros/${id}`);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };
  const handleUpdate = async (id, livroAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/livros/${id}`, livroAtualizado);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };
    
  return (
    <div>
      {/* Cabeçalho */}
      <h1>Gerenciamento de Livros</h1>
  
      {/* Formulário de adição de livros */}
      <form onSubmit={handleSubmit}>
        {/* Campo para a nome */}
        <input
          type="text"
          name="nome"
          placeholder="nome"
          value={novoLivro.nome}
          onChange={handleInputChange}
        />
        {/* Campo para a autor */}
        <input 
          type="text"
          name="editora"
          placeholder="editora"
          value={novoLivro.editora}
          onChange={handleInputChange}
        />
        {/* Campo para o autor */}
        <input
          type="text"
          name="autor"
          placeholder="autor"
          value={novoLivro.autor}
          onChange={handleInputChange}
        />
         {/* Campo para a genero */}
         <input
          type="text"
          name="genero"
          placeholder="genero"
          value={novoLivro.genero}
          onChange={handleInputChange}
        />
        {/* Campo para o isbn */}
        <input
          type="text"
          name="isbn"
          placeholder="isbn"
          value={novoLivro.isbn}
          onChange={handleInputChange}
        />
        {/* Botão de envio do formulário */}
        <button type="submit">Adicionar Livro</button>
      </form>
  
      {/* Lista de livros */}
      <ul>
        {/* Mapeamento dos livros */}
        {livros.map((livro) => (
          <li key={livro.id}>
            {/* Exibição dos detalhes do veículo */}
            {livro.nome} - {livro.editora} {livro.autor}  {livro.genero}  {livro.isbn}
            
            {/* Botão de exclusão */}
            <button onClick={() => handleDelete(livro.id)}>Excluir</button>
            
            {/* Botão de atualização */}
            <button
              onClick={() =>
                handleUpdate(livro.id, {
                  ...livro,
                  autor: 'Novo modelo Atualizado', // Exemplo de atualização
                })
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
}
export default App;