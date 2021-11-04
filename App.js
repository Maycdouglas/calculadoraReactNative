import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView,  } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default function App() {

  const [estadoAtual, setEstadoAtual] = useState({...initialState})

  addDigit = n => {

    //responsável por limpar o display caso tenha apenas o 0 ou a variavel esteja verdadeira
    const clearDisplay = estadoAtual.displayValue === '0'
      || estadoAtual.clearDisplay

     //verifica se o ponto já nao foi utilizado no numero
     if(n === '.' && !clearDisplay && estadoAtual.displayValue.includes('.')) {
      return
    }

    //responsavel por verificar se o display deve ser limpo ou utilizar o valor
    const currentValue = clearDisplay ? '' : estadoAtual.displayValue

    //concatena os valores
    const displayValue = currentValue + n

    

    if(n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...estadoAtual.values]
      values[estadoAtual.current] = newValue
      setEstadoAtual({...estadoAtual, displayValue: displayValue, clearDisplay: false, values: values})
    }
    else {
      setEstadoAtual({...estadoAtual, displayValue: displayValue, clearDisplay: false})
    }
  }

  const clearMemory = () => {
    setEstadoAtual({ ...initialState })
  }

  const setOperation = operation => {
    if(estadoAtual.current === 0){
      setEstadoAtual({...estadoAtual, operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...estadoAtual.values]
      try {
        values[0] = eval(`${values[0]} ${estadoAtual.operation} ${values[1]}`)
      } catch (e) {
        values[0] = estadoAtual.values[0]
      }
      
      values[1] = 0
      setEstadoAtual({
        ...estadoAtual, 
        displayValue: `${values[0]}`, 
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values: values
      })
    }
  }

  return (
      <View style={styles.container}>
        <Display value={estadoAtual.displayValue}/>
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={clearMemory}/>
          <Button label='/' operation onClick={ () => setOperation('/')}/>
          <Button label='7' onClick={ addDigit }/>
          <Button label='8' onClick={ addDigit }/>
          <Button label='9' onClick={ addDigit }/>
          <Button label='*' operation onClick={ () => setOperation('*')}/>
          <Button label='4' onClick={ addDigit }/>
          <Button label='5' onClick={ addDigit }/>
          <Button label='6' onClick={ addDigit }/>
          <Button label='-' operation onClick={ () => setOperation('-')}/>
          <Button label='1' onClick={ addDigit }/>
          <Button label='2' onClick={ addDigit }/>
          <Button label='3' onClick={ addDigit }/>
          <Button label='+' operation onClick={ () => setOperation('+')}/>
          <Button label='0' onClick={ addDigit }/>
          <Button label='.' onClick={ addDigit }/>
          <Button label='=' operation onClick={ () => setOperation('=')}/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
