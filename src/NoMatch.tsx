import React from "react"
import { Heading, Text } from "@kiwicom/orbit-components"

export default function NoMatch() {
    return (
        <div className="add-padding">
            <Heading>
                Oh no!
            </Heading>
            <Text>
                It seems the address is not valid.
            </Text>
        </div>
    )
}