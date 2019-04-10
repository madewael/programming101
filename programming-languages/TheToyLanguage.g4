grammar TheToyLanguage;

program             : function_definition* expression ';'                ;

function_definition : 'function' Identifier '(' parameter_list ')' block ;
function_call       : Identifier '(' argument_list ')'                   ;
grouped_expression  : '(' expression ')'                                 ;
binary_expression   : expression bin_operator expression                 ;
unary_expression    : unary_operator expression                          ;

variable_definition : 'let' Identifier ('=' expression)? ';'             ;
variable_assignment : Identifier '=' expression ';'                      ;
while_statement     : 'while' '(' expression ')' statement               ;
return_statement    : 'return' expression ';'                            ;

parameter_list      : (Identifier (',' Identifier)*)?                    ;
argument_list       : (expression (',' expression)*)?                    ;
block               : '{' statement* '}'                                 ;

bin_operator        : '+' | '-' | '*' | '/' | '%' | '<' | '>'            ;
unary_operator      : '!' | '-'                                          ;

Integer             : '0' | [1-9] [0-9]*                                 ;
Identifier          : ([a-z]|[A-Z])([a-z]|[A-Z]|[0-9])*                  ;

expression
 : Identifier
 | literal
 | function_call
 | grouped_expression
 | binary_expression
 | unary_expression
 ;

statement
 : variable_definition
 | variable_assignment
 | while_statement
 | return_statement
 | block
 ;

literal
 : Integer
 ;