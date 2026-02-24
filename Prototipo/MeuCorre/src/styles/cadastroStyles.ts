import { StyleSheet, Platform } from 'react-native';

export const cadastroStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo Dark Mode (Preto Profundo)
  },
  // Estilo para garantir que o KeyboardAvoidingView ocupe a tela toda
  avoidingView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
    // Aumentamos o padding inferior para garantir que o último input
    // fique visível acima do teclado no iOS e Android
    paddingBottom: Platform.OS === 'ios' ? 140 : 110,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    backgroundColor: '#FFD700', // Amarelo Segurança
    padding: 20,
    borderRadius: 30,
    marginBottom: 16,
    shadowColor: '#FFD700',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  titulo: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -1,
  },
  subtitulo: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 28, // Bordas arredondadas conforme Guia UX
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#252525',
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  labelSecao: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    // Fundo semi-transparente para dar profundidade ao botão fixo
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
  },
});
