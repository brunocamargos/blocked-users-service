const fn = () => ({});

const dbAdapterStubFactory = (insertOneStub, updateOneStub, findOneStub) => ({
  get db() {
    return {
      collection() {
        return {
          insertOne: insertOneStub || fn,
          updateOne: updateOneStub || fn,
          findOne: findOneStub || fn,
        };
      },
    };
  },
});

export default dbAdapterStubFactory;
