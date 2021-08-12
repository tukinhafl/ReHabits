import styled from 'styled-components'
import { CardGroup } from '../CardGroup'

export const StyledBackgroundGroups = styled.div`
  background-color: var(--background);
  height: calc(100% - 55px);
  padding: 30px;

  @media (max-width: 768px) {
    padding: 0;
  }

  button {
    font-size: 24px;
    font-family: var(--font-title);
    height: 50px;
    width: 250px;
    background: #ECDEB0;
    cursor: pointer;
    border-radius: 10px;
    border: 2px solid #000000;
  }

  .back {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .containerGroups {
    background-color: var(--white);
    height: 100%;
    position: relative;

    @media (max-width: 768px) {
      background-color: var(--background);
    }

    #headerPosition {
      width: 100%;
      display: flex;
      position: relative;

      h1 {
        width: 100%;
      }

      button {
        position: absolute;
        top: 20px;
        right: 20px;
        align-self: flex-end;
      }
    }

    .backgroundWork {
      height: 75%;
      width: 80%;
      background-color: ${props => props.backgroundColor};
      margin: 0 auto;
      position: relative;

      .button {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 55px;
        width: 40%;
        border-radius: 7px;
        border: 2px solid black;
        background-color: var(--gold);
        font-size: 1.5rem;
        font-weight: bold;
        margin: 15px 0px 10px 0px;
        cursor: pointer;
        transition: filter 0.2s;
        font-family: var(--font-button);

        &:hover {
          filter: brightness(110%);
        }
      }

      img {
        display: flex;
        height: 100%;
        margin: 0 auto;
      }

      .containerGoalsActivies {
        display: flex;

        .workGoals, .workActivies {
          width: 50%;
          position: absolute;
          top: 0;
          padding: 10px;
      
          h2 {
            font-family: var(--font-title);
            text-align: center;
            padding-top: 15px;
          }
        }

        .workActivies {   
          right: 0;
          overflow: auto;
        }
      }
    }
    
    h1{
      font-family: var(--font-title);
      font-weight: 400;
      text-shadow: 0 4px 4px gray;
      text-align: center;
      font-size: 64px;
    }
  }
`

export const BackgroundGroups = ({ groupName, image, goals, backgroundColor, activities }) => {  
  return (
    <StyledBackgroundGroups backgroundColor={backgroundColor}>
      <div className="containerGroups">
        <h1>{groupName}</h1>
        <div className='backgroundWork'>
          <img src={image} alt="Group work" />
          <div className='containerGoalsActivies'>
            <ul className='workGoals'>
              <h2>Objetivos</h2>
              {goals?.map((el, idx) =>
                <CardGroup
                  key={idx}
                  title={el.title} 
                  difficulty={el.difficulty}
                  achieved={JSON.stringify(el.achieved)}
                />
              )}
            </ul>
            <ul className='workActivies'>
              <h2>Atividades</h2>
              {activities?.map((el, idx) =>
                <CardGroup
                  key={idx}
                  title={el.title} 
                />
              )}
            </ul>
          </div>
        </div>
      </div>
    </StyledBackgroundGroups>
  )
}