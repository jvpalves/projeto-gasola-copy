import { ContainerMain, Input, SearchBar, ContainerCard, IconGitHub,Div } from "./style";
import { useState } from "react";
import {  fetchGitHubData } from '../../utils/api';
import Button from "../Button";
import { ReposProps } from '../../types/types';
import CardRepo from "../CardRepo";
import gitCat from '../../images/github_main.png'

const INITIAL_VALUE = {
  name: '',
};

function Main() {
  const [input, setInput] = useState(INITIAL_VALUE);
  const [repos, setRepos] = useState<ReposProps[]>([]);


  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  

  const handleClick = async () => {
    const inputName = input.name.replace(/\s+/g,'')
    if (inputName.trim() !== '') {
      try {
        const data = await fetchGitHubData(inputName)
        setRepos(data.items)
      } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
      }
    }
  };

  return (
    <>
      <Div>
      <IconGitHub src= {gitCat} />
      <ContainerMain>
        <SearchBar>
          <Input
            value={input.name}
            type="text"
            onChange={handleChange}
            placeholder="Search GitHub username..."
            name="name"
          />
          <Button onClick={handleClick} text="Search" />
        </SearchBar>
        <ContainerCard>
       {repos.map((item: ReposProps)=>(
        <CardRepo key={item.id}
        id={item.id}
        owner={item.owner}
        />
       ))
        }
        </ContainerCard>
        
      </ContainerMain>
      </Div>
    </>
  );
}

export default Main;
