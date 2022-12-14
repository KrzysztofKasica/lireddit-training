import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";


interface registerProps {}
  

const Register: React.FC<registerProps> = ({}) => {
        return (
          <Wrapper>
              <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({isSubmitting}) => (
              <Form>
                  <InputField
                    name="username"
                    placeholder="username"
                    label="Username"
                  />
                  <Box mt={4}>
                    <InputField
                      name="password"
                      placeholder="password"
                      label="Password"
                      type="password"
                    />
                  </Box>
                <Button  mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">Register</Button>
              </Form>
              )}
            </Formik>
          </Wrapper>
        );
            
};


export default Register