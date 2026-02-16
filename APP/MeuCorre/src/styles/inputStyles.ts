import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    color: '#FFF',
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputErro: {
    borderBottomColor: '#D50000', // Cor de Erro/Alerta do Guia UX
  },
});
