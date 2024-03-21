package develop;

import com.fasterxml.jackson.core.type.TypeReference;
import dev.restate.sdk.common.CoreSerdes;
import dev.restate.sdk.common.Serde;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.serde.jackson.JacksonSerdes;

import javax.annotation.Nullable;

import static greeter.generated.GreeterProto.*;

import java.util.Arrays;
import java.util.List;

public class SerializationExample {
    List<Serde> serializers = Arrays.asList(
            //<start_here>
            CoreSerdes.VOID,
            CoreSerdes.JSON_BYTE,
            CoreSerdes.JSON_STRING,
            CoreSerdes.JSON_BOOLEAN,
            CoreSerdes.JSON_BYTE,
            CoreSerdes.JSON_SHORT,
            CoreSerdes.JSON_INT,
            CoreSerdes.JSON_LONG,
            CoreSerdes.JSON_FLOAT,
            CoreSerdes.JSON_DOUBLE
            //<end_here>
    );

    // <start_statekey>
    StateKey<Long> STATE_KEY = StateKey.of("my-key", CoreSerdes.JSON_LONG);
    // <end_statekey>

    private void someFn(){

        // <start_protoserdes>
        CoreSerdes.ofProtobuf(GreetResponse.parser());
        // <end_protoserdes>

        // <start_pojoserdes>
        JacksonSerdes.of(Person.class);
        // <end_pojoserdes>

        // <start_typerefserdes>
        JacksonSerdes.of(new TypeReference<List<Integer>>() { });
        // <end_typerefserdes>

        // <start_person_state_key>
        StateKey<Person> PERSON_STATE_KEY = StateKey.of("person", new MyPersonSerde());
        // <end_person_state_key>

    }
}

// <start_customserdes>
class MyPersonSerde implements Serde<Person> {
    @Override
    public byte[] serialize(@Nullable Person person) {
        // convert value to a ByteArray
        return person.toBytes();
    }

    @Override
    public Person deserialize(byte[] bytes) {
        // convert value to Person
        return Person.fromBytes(bytes);
    }
}
// <end_customserdes>

// just to make the rest compile
class Person {
    public static Person fromBytes(byte[] bytes){
        return new Person();
    }

    public byte[] toBytes(){
        return "".getBytes();
    }
}