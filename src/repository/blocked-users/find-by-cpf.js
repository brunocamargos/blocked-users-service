const findByCPF = genericRepository => cpf => genericRepository.findOne({ cpf });

export default findByCPF;
