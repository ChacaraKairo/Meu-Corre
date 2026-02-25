import { StyleSheet, Platform } from 'react-native';

export const cadastroStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', // Preto Profundo do protótipo
  },
  avoidingView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: Platform.OS === 'ios' ? 140 : 110,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    backgroundColor: '#00C853', // Verde Sucesso
    padding: 20,
    borderRadius: 30,
    marginBottom: 16,
    shadowColor: '#00C853',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  titulo: {
    color: '#00C853',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1.5,
    textTransform: 'uppercase',
  },
  subtitulo: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#161616', // Cinza muito escuro para contraste
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#222',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  labelSecao: {
    color: '#666',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});
