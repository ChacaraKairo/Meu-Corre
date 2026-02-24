import { StyleSheet, Platform } from 'react-native';

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
    backgroundColor: '#1E1E1E',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  perfilContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  saudacao: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  nomeUsuario: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
  },
  veiculoCard: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  veiculoInfo: {
    flex: 1,
  },
  veiculoNome: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  veiculoDetalhes: {
    color: '#121212',
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  cardFinanceiro: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#252525',
  },
  cardLabel: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardValor: {
    fontSize: 18,
    fontWeight: '900',
  },
  valorGanho: { color: '#4CAF50' },
  valorGasto: { color: '#F44336' },
  footer: {
    padding: 24,
    flexDirection: 'row',
    gap: 12,
  },
});
