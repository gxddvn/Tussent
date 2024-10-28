import { CodeInline, Head, Hr, Html, Text } from '@react-email/components'

const TemplateEmail = () => {
    return (
        <Html lang="en">
            <Head>
                <title>Tussent verification</title>
            </Head>
            <Hr/>
            <Text className="text-center">
                Your code:{" "}
                <CodeInline className="rounded-md bg-gray-300 px-[4px] py-[2px]">
                    CODE_VERIFICATION
                </CodeInline>{" "}
            </Text>
        </Html>
    )
}

export default TemplateEmail